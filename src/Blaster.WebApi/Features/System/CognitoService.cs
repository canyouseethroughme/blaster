﻿using System.Net.Http;
using System.Threading.Tasks;
using Blaster.WebApi.Features.Dashboards;
using Blaster.WebApi.Features.System.Models;
using Microsoft.Extensions.Configuration;
using NotImplementedException = System.NotImplementedException;

namespace Blaster.WebApi.Features.System
{
    public class CognitoService : ICognitoService
    {
        private const string CognitoApiUrlKey = "BLASTER_COGNITO_API_URL";

        private readonly HttpClient _client;
        private readonly IJsonSerializer _serializer;
        private readonly string _cognitoApiUrl;

        public CognitoService(IConfiguration configuration, HttpClient client, IJsonSerializer serializer)
        {
            _cognitoApiUrl = configuration[CognitoApiUrlKey];

            if (string.IsNullOrWhiteSpace(_cognitoApiUrl))
            {
                throw new MissingConfigurationException($"Error, missing configuration value for \"{CognitoApiUrlKey}\".");
            }

            _client = client;
            _serializer = serializer;
        }

        public async Task<string> SayHello()
        {
            var response = await _client.GetAsync($"{_cognitoApiUrl}/system/health");
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<AwsConsoleLinkResponse> GetAwsConsoleLink(string idToken)
        {
            var response = await _client.GetAsync($"{_cognitoApiUrl}/aws/console?idToken={idToken}");
            var content = await response.Content.ReadAsStringAsync();

            return _serializer.Deserialize<AwsConsoleLinkResponse>(content);
        }
    }
}