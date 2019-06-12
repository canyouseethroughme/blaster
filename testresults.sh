# Uses tag in the docker image to find correct layer and extract test results to local folder
export id=$(docker images --filter "label=test=true" -q | head -1)
docker create --name testcontainer $id
docker cp testcontainer:/src/testresults ./testresults
docker rm testcontainer