﻿using System.Net;
using System.Threading.Tasks;
using Blaster.Tests.Builders;
using Blaster.Tests.TestDoubles;
using Blaster.WebApi;
using Blaster.WebApi.Features.Namespaces;
using Xunit;

namespace Blaster.Tests
{
    public class TestNamespaceRoutes
    {
        [Fact]
        public async Task get_returns_expected_status_code()
        {
            using (var clientBuilder = new HttpClientBuilder())
            {
                var client = clientBuilder
                    .WithService<INamespaceRepository>(new StubNamespaceRepository())
                    .WithService<IApiKeyValidator>(new StubApiKeyValidator(isValid:true))
                    .Build();

                var response = await client.GetAsync("/api/namespaces");

                Assert.Equal(
                    expected: HttpStatusCode.OK,
                    actual: response.StatusCode
                );
            }
        }
    }
}