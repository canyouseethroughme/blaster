
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app


FROM mcr.microsoft.com/dotnet/core/sdk:2.1 AS buildprep
WORKDIR /src
COPY src/ .

# Install npm dependencies
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -yq nodejs build-essential
RUN npm install -g npm


FROM buildprep AS build
#Restore dependencies
RUN npm install
RUN dotnet restore Blaster.sln

#Build Project
RUN npm run build
RUN dotnet build -c Release Blaster.sln

# Test, using lable to identify layer later
LABEL test=true
RUN MSYS_NO_PATHCONV=1 dotnet test \
        -c Release \
        --no-build \
        --logger:"trx;LogFileName=testresults.trx" \
        Blaster.Tests/Blaster.Tests.csproj \
        /p:CollectCoverage=true \
        /p:CoverletOutputFormat=cobertura \
        '/p:Include="[Blaster.WebApi]*"'

RUN mkdir /src/testresults
RUN mv ./Blaster.Tests/coverage.cobertura.xml /src/testresults/
RUN mv ./Blaster.Tests/TestResults/testresults.trx /src/testresults/

FROM build AS publish
WORKDIR /src
RUN     dotnet publish \
        --no-build \
        -c Release \
        -o /src/output/app \
        Blaster.WebApi/Blaster.WebApi.csproj

FROM base AS release
WORKDIR /app
COPY --from=publish /src/output/app /app
ENTRYPOINT [ "dotnet", "Blaster.WebApi.dll" ]