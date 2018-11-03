(function () {
    // We use the same logic that Plugin uses to find their implementation in private assemblies.
    // From there we can find where our implementation files are in CommonExtensions
    var cookie;
    var pluginUrl = window.external.pluginUrl || (cookie = document.cookie.match(/(?:^|;)\s?pluginUrl=(.*?)(?:;|$)/)) && unescape(cookie[1]) || "plugin.b.js";

    var privateAssembliesUrl = pluginUrl.slice(0, pluginUrl.lastIndexOf('/'));
    var diagnosticsHubUrl = privateAssembliesUrl + "/../CommonExtensions/Platform/DiagnosticsHub/WebViews/Scripts/";

    var diagnosticsHubScript = document.createElement("script");
    diagnosticsHubScript.type = "text/javascript";
    diagnosticsHubScript.src = diagnosticsHubUrl + "DiagnosticsHub.Impl.js";

    var serviceHubScript = document.createElement("script");
    serviceHubScript.type = "text/javascript";
    serviceHubScript.src = pluginUrl.replace("plugin.vs.js", "serviceHub.all.js");

    var serviceHubRpcScript = document.createElement("script");
    serviceHubRpcScript.type = "text/javascript";
    serviceHubRpcScript.src = pluginUrl.replace("plugin.vs.js", "jsonRpc.all.js");

    document.head.appendChild(diagnosticsHubScript);
    document.head.appendChild(serviceHubScript);
    document.head.appendChild(serviceHubRpcScript);
})();

// SIG // Begin signature block
// SIG // MIIj6wYJKoZIhvcNAQcCoIIj3DCCI9gCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 4duKQH8U/D+B64CBQeh/6CaSbVP1bL3J+yqH+PMJZ+ug
// SIG // gg2DMIIGATCCA+mgAwIBAgITMwAAAMTpifh6gVDp/wAA
// SIG // AAAAxDANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTE3MDgxMTIwMjAyNFoX
// SIG // DTE4MDgxMTIwMjAyNFowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // iIq4JMMHj5qAeRX8JmD8cogs+vSjl4iWRrejy1+JLzoz
// SIG // Lh6RePp8qR+CAbV6yxq8A8pG68WZ9/sEHfKFCv8ibqHy
// SIG // Zz3FJxjlKB/1BJRBY+zjuhWM7ROaNd44cFRvO+ytRQkw
// SIG // ScG+jzCZDMt2yfdzlRZ30Yu7lMcIhSDtHqg18XHC4HQA
// SIG // S4rS3JHr1nj+jfqtYIg9vbkfrmKXv8WEsZCu1q8r01T7
// SIG // NdrNcZLmHv/scWvLfwh2dOAQUUjU8QDISEyjBzXlWQ39
// SIG // fJzI5lrjhfXWmg8fjqbkhBfB1sqfHQHH/UinE5IzlyFI
// SIG // MvjCJKIAsr5TyoNuKVuB7zhugPO77BML6wIDAQABo4IB
// SIG // gDCCAXwwHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFMvWYoTPYDnq/2fCXNLIu6u3
// SIG // wxOYMFIGA1UdEQRLMEmkRzBFMQ0wCwYDVQQLEwRNT1BS
// SIG // MTQwMgYDVQQFEysyMzAwMTIrYzgwNGI1ZWEtNDliNC00
// SIG // MjM4LTgzNjItZDg1MWZhMjI1NGZjMB8GA1UdIwQYMBaA
// SIG // FEhuZOVQBdOCqhc3NyK1bajKdQKVMFQGA1UdHwRNMEsw
// SIG // SaBHoEWGQ2h0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY3JsL01pY0NvZFNpZ1BDQTIwMTFfMjAxMS0w
// SIG // Ny0wOC5jcmwwYQYIKwYBBQUHAQEEVTBTMFEGCCsGAQUF
// SIG // BzAChkVodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // b3BzL2NlcnRzL01pY0NvZFNpZ1BDQTIwMTFfMjAxMS0w
// SIG // Ny0wOC5jcnQwDAYDVR0TAQH/BAIwADANBgkqhkiG9w0B
// SIG // AQsFAAOCAgEABhYf21fCUMgjT6JReNft+P3NvdXA8fkb
// SIG // Vu1TyGlHBdXEy+zi/JlblV8ROCjABUUT4Jp5iLxmq9u7
// SIG // 6wJVI7c9I3hBba748QBalJmKHMwJldCaHEQwqaUWx7pH
// SIG // W/UrNIufj1g3w04cryLKEM3YghCpNfCuIsiPJKaBi98n
// SIG // HORmHYk+Lv9XA03BboOgMuu0sy9QVl0GsRWMyB1jt3MM
// SIG // 49Z6Jg8qlkWnMoM+lj5XSXcjif6xEMeK5QgVUcUrWjFb
// SIG // OWqWqKSIa5Yob/HEruq9RRfMYk6BtVQaR46YpW3AbifG
// SIG // +CcfyO0gqQux8c4LmpTiap1pg6E2120g/oXV/8O4lzYJ
// SIG // /j0UwZgUqcCGzO+CwatVJEMYtUiFeIbQ+dKdPxnZFInn
// SIG // jZ9oJIhoO6nHgE4m5wghTGP9nJMVTTO1VmBP10q5OI7/
// SIG // Lt2xX6RDa8l4z7G7a4+DbIdyquql+5/dGtY5/GTJbT4I
// SIG // 5XyDsa28o7p7z5ZWpHpYyxJHYtIh7/w8xDEL9y8+ZKU3
// SIG // b2BQP7dEkE+gC4u+flj2x2eHYduemMTIjMtvR+HALpTt
// SIG // sfawMG3sakmo6ZZ2yL0IxP479a5zNwayVs8Z1Lv1lMqH
// SIG // HPKAagFPthuBc7PTWyI/OlgY34juZ8RJpy/cJYs9XtDs
// SIG // NESRHbyRDHaCPu/E2C2hBAKOSPnv3QLPA6Iwggd6MIIF
// SIG // YqADAgECAgphDpDSAAAAAAADMA0GCSqGSIb3DQEBCwUA
// SIG // MIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylN
// SIG // aWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3Jp
// SIG // dHkgMjAxMTAeFw0xMTA3MDgyMDU5MDlaFw0yNjA3MDgy
// SIG // MTA5MDlaMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAmBgNV
// SIG // BAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENBIDIw
// SIG // MTEwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
// SIG // AQCr8PpyEBwurdhuqoIQTTS68rZYIZ9CGypr6VpQqrgG
// SIG // OBoESbp/wwwe3TdrxhLYC/A4wpkGsMg51QEUMULTiQ15
// SIG // ZId+lGAkbK+eSZzpaF7S35tTsgosw6/ZqSuuegmv15ZZ
// SIG // ymAaBelmdugyUiYSL+erCFDPs0S3XdjELgN1q2jzy23z
// SIG // OlyhFvRGuuA4ZKxuZDV4pqBjDy3TQJP4494HDdVceaVJ
// SIG // KecNvqATd76UPe/74ytaEB9NViiienLgEjq3SV7Y7e1D
// SIG // kYPZe7J7hhvZPrGMXeiJT4Qa8qEvWeSQOy2uM1jFtz7+
// SIG // MtOzAz2xsq+SOH7SnYAs9U5WkSE1JcM5bmR/U7qcD60Z
// SIG // I4TL9LoDho33X/DQUr+MlIe8wCF0JV8YKLbMJyg4JZg5
// SIG // SjbPfLGSrhwjp6lm7GEfauEoSZ1fiOIlXdMhSz5SxLVX
// SIG // PyQD8NF6Wy/VI+NwXQ9RRnez+ADhvKwCgl/bwBWzvRvU
// SIG // VUvnOaEP6SNJvBi4RHxF5MHDcnrgcuck379GmcXvwhxX
// SIG // 24ON7E1JMKerjt/sW5+v/N2wZuLBl4F77dbtS+dJKacT
// SIG // KKanfWeA5opieF+yL4TXV5xcv3coKPHtbcMojyyPQDdP
// SIG // weGFRInECUzF1KVDL3SV9274eCBYLBNdYJWaPk8zhNqw
// SIG // iBfenk70lrC8RqBsmNLg1oiMCwIDAQABo4IB7TCCAekw
// SIG // EAYJKwYBBAGCNxUBBAMCAQAwHQYDVR0OBBYEFEhuZOVQ
// SIG // BdOCqhc3NyK1bajKdQKVMBkGCSsGAQQBgjcUAgQMHgoA
// SIG // UwB1AGIAQwBBMAsGA1UdDwQEAwIBhjAPBgNVHRMBAf8E
// SIG // BTADAQH/MB8GA1UdIwQYMBaAFHItOgIxkEO5FAVO4eqn
// SIG // xzHRI4k0MFoGA1UdHwRTMFEwT6BNoEuGSWh0dHA6Ly9j
// SIG // cmwubWljcm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3Rz
// SIG // L01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18yMi5jcmww
// SIG // XgYIKwYBBQUHAQEEUjBQME4GCCsGAQUFBzAChkJodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y1Jvb0NlckF1dDIwMTFfMjAxMV8wM18yMi5jcnQwgZ8G
// SIG // A1UdIASBlzCBlDCBkQYJKwYBBAGCNy4DMIGDMD8GCCsG
// SIG // AQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL2RvY3MvcHJpbWFyeWNwcy5odG0wQAYIKwYB
// SIG // BQUHAgIwNB4yIB0ATABlAGcAYQBsAF8AcABvAGwAaQBj
// SIG // AHkAXwBzAHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJKoZI
// SIG // hvcNAQELBQADggIBAGfyhqWY4FR5Gi7T2HRnIpsLlhHh
// SIG // Y5KZQpZ90nkMkMFlXy4sPvjDctFtg/6+P+gKyju/R6mj
// SIG // 82nbY78iNaWXXWWEkH2LRlBV2AySfNIaSxzzPEKLUtCw
// SIG // /WvjPgcuKZvmPRul1LUdd5Q54ulkyUQ9eHoj8xN9ppB0
// SIG // g430yyYCRirCihC7pKkFDJvtaPpoLpWgKj8qa1hJYx8J
// SIG // aW5amJbkg/TAj/NGK978O9C9Ne9uJa7lryft0N3zDq+Z
// SIG // KJeYTQ49C/IIidYfwzIY4vDFLc5bnrRJOQrGCsLGra7l
// SIG // stnbFYhRRVg4MnEnGn+x9Cf43iw6IGmYslmJaG5vp7d0
// SIG // w0AFBqYBKig+gj8TTWYLwLNN9eGPfxxvFX1Fp3blQCpl
// SIG // o8NdUmKGwx1jNpeG39rz+PIWoZon4c2ll9DuXWNB41sH
// SIG // nIc+BncG0QaxdR8UvmFhtfDcxhsEvt9Bxw4o7t5lL+yX
// SIG // 9qFcltgA1qFGvVnzl6UJS0gQmYAf0AApxbGbpT9Fdx41
// SIG // xtKiop96eiL6SJUfq/tHI4D1nvi/a7dLl+LrdXga7Oo3
// SIG // mXkYS//WsyNodeav+vyL6wuA6mk7r/ww7QRMjt/fdW1j
// SIG // kT3RnVZOT7+AVyKheBEyIXrvQQqxP/uozKRdwaGIm1dx
// SIG // Vk5IRcBCyZt2WwqASGv9eZ/BvW1taslScxMNelDNMYIV
// SIG // wDCCFbwCAQEwgZUwfjELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEo
// SIG // MCYGA1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQ
// SIG // Q0EgMjAxMQITMwAAAMTpifh6gVDp/wAAAAAAxDANBglg
// SIG // hkgBZQMEAgEFAKCBrjAZBgkqhkiG9w0BCQMxDAYKKwYB
// SIG // BAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGC
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQg8tbcJZvMjGWIcVji
// SIG // GpLHzZFSicTXh92mq2ae/Koko3AwQgYKKwYBBAGCNwIB
// SIG // DDE0MDKgFIASAE0AaQBjAHIAbwBzAG8AZgB0oRqAGGh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbTANBgkqhkiG9w0B
// SIG // AQEFAASCAQAEv1JeNUiW6/e5YOa3GMUIrXNT+lofZxdd
// SIG // tPfni1u36KjFI1xWJAIwvFCNan6oAfGLY62TkhZmWowO
// SIG // yeI684DZcbmgIqiUCLaS3M6ock/QXjsj+j/ld5Ekrh47
// SIG // BG4Z0Z8A6RMXdDTpnREvn5MGc6O9b9jpUlfiOyIWujnS
// SIG // GFb5qQmTZzsF8ImqQT92hw/YT0uJgDaV+ayV6zohg8gZ
// SIG // zSUdg+zEY08vfvdIUx0M6Quh49szR1Efb8aBCfRj0gWb
// SIG // tApwdEHLibLg98vVJbjPenolOJ1mYnSKsYZfp7EKCzx9
// SIG // vHt2z1cTfmK+r4POFWz8tjK8Wlwx250a28GMqaVUAz+p
// SIG // oYITSjCCE0YGCisGAQQBgjcDAwExghM2MIITMgYJKoZI
// SIG // hvcNAQcCoIITIzCCEx8CAQMxDzANBglghkgBZQMEAgEF
// SIG // ADCCAT0GCyqGSIb3DQEJEAEEoIIBLASCASgwggEkAgEB
// SIG // BgorBgEEAYRZCgMBMDEwDQYJYIZIAWUDBAIBBQAEIC9V
// SIG // scTDv+02cuFMI/lg3X8cW+cO7jozvTRDVtrENby3AgZb
// SIG // KojQ4wQYEzIwMTgwNzA2MjMwMDI5LjI0NFowBwIBAYAC
// SIG // AfSggbmkgbYwgbMxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xDTAL
// SIG // BgNVBAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIgRFNF
// SIG // IEVTTjo3MjhELUM0NUYtRjlFQjElMCMGA1UEAxMcTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCDs0wggTa
// SIG // MIIDwqADAgECAhMzAAAAsjUFaDciHA2nAAAAAACyMA0G
// SIG // CSqGSIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // JjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QSAyMDEwMB4XDTE2MDkwNzE3NTY1N1oXDTE4MDkwNzE3
// SIG // NTY1N1owgbMxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xDTALBgNV
// SIG // BAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIgRFNFIEVT
// SIG // Tjo3MjhELUM0NUYtRjlFQjElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZTCCASIwDQYJKoZI
// SIG // hvcNAQEBBQADggEPADCCAQoCggEBAJhKAbvRWPV/dJFC
// SIG // 6aEuU13yLCBvEi6b09eVldydb4l8DmtwKU2wLg81VvaP
// SIG // Akv4fFVtUM0/x6p48hAHqAdrA7v8K/CqJZ3d/PFjcCRl
// SIG // b4T6S0ReznIofcKzH8VvhmqZh666/swFmL5vvhWCR2W3
// SIG // L3XKvNoQeps7Mk/aHUiSDiLnsbFCbVnCYp4sKgrwNTcg
// SIG // Agns4RTjtRfjgH5U7l1RDpPZmkozya8mDev2ayOVLz9d
// SIG // EiE3SiTPjr0Pm1M/7unujHB72jv1armZPLfbAXwSyz9V
// SIG // zvSv1ga5OjzffCfUcpTNr0oJNsYi7F1zvTrigBod9b13
// SIG // cI1jcHvAwPbunjRph7cCAwEAAaOCARswggEXMB0GA1Ud
// SIG // DgQWBBQzZL5naxzc+WNEBkjkxUPJkPaClTAfBgNVHSME
// SIG // GDAWgBTVYzpcijGQ80N7fEYbxTNoWoVtVTBWBgNVHR8E
// SIG // TzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5j
// SIG // b20vcGtpL2NybC9wcm9kdWN0cy9NaWNUaW1TdGFQQ0Ff
// SIG // MjAxMC0wNy0wMS5jcmwwWgYIKwYBBQUHAQEETjBMMEoG
// SIG // CCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpL2NlcnRzL01pY1RpbVN0YVBDQV8yMDEwLTA3
// SIG // LTAxLmNydDAMBgNVHRMBAf8EAjAAMBMGA1UdJQQMMAoG
// SIG // CCsGAQUFBwMIMA0GCSqGSIb3DQEBCwUAA4IBAQBB4LKg
// SIG // oMr0KG/Mjd3+270gVYlsICl2dj/UJ8lee4P7wcJHNo32
// SIG // eiFMRBs6cWOrIya/RK6iGe8n1liGunpw+i+0S+RxSDpX
// SIG // 0rX/oxAbmgnDXx4J6DDNketUXMELWf706lIvqHo1a2C2
// SIG // gzgJppp225az1zWHqGQ6XAbPTBMNxiIYtwBjjLh1sUXh
// SIG // qUda2//8uxodVDnbFV/mV+Q0nngv/bTcIN/SExCjzj1x
// SIG // 2eGwXmVZe45s7pWzmd/wqBxhD0xPV6rWxDH2fA1i62xr
// SIG // AKEKhNJ8cSknIqTYEw/Aesid3To56t4nBtwEYY48aoSa
// SIG // 3062mu2wTOH6UY2AQgWmJvaDbwHmMIIGcTCCBFmgAwIB
// SIG // AgIKYQmBKgAAAAAAAjANBgkqhkiG9w0BAQsFADCBiDEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWljcm9z
// SIG // b2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IDIw
// SIG // MTAwHhcNMTAwNzAxMjEzNjU1WhcNMjUwNzAxMjE0NjU1
// SIG // WjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDCCASIw
// SIG // DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKkdDbx3
// SIG // EYo6IOz8E5f1+n9plGt0VBDVpQoAgoX77XxoSyxfxcPl
// SIG // YcJ2tz5mK1vwFVMnBDEfQRsalR3OCROOfGEwWbEwRA/x
// SIG // YIiEVEMM1024OAizQt2TrNZzMFcmgqNFDdDq9UeBzb8k
// SIG // YDJYYEbyWEeGMoQedGFnkV+BVLHPk0ySwcSmXdFhE24o
// SIG // xhr5hoC732H8RsEnHSRnEnIaIYqvS2SJUGKxXf13Hz3w
// SIG // V3WsvYpCTUBR0Q+cBj5nf/VmwAOWRH7v0Ev9buWayrGo
// SIG // 8noqCjHw2k4GkbaICDXoeByw6ZnNPOcvRLqn9NxkvaQB
// SIG // wSAJk3jN/LzAyURdXhacAQVPIk0CAwEAAaOCAeYwggHi
// SIG // MBAGCSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBTVYzpc
// SIG // ijGQ80N7fEYbxTNoWoVtVTAZBgkrBgEEAYI3FAIEDB4K
// SIG // AFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/
// SIG // BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2U
// SIG // kFvXzpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYI
// SIG // KwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jv
// SIG // b0NlckF1dF8yMDEwLTA2LTIzLmNydDCBoAYDVR0gAQH/
// SIG // BIGVMIGSMIGPBgkrBgEEAYI3LgMwgYEwPQYIKwYBBQUH
// SIG // AgEWMWh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9QS0kv
// SIG // ZG9jcy9DUFMvZGVmYXVsdC5odG0wQAYIKwYBBQUHAgIw
// SIG // NB4yIB0ATABlAGcAYQBsAF8AUABvAGwAaQBjAHkAXwBT
// SIG // AHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJKoZIhvcNAQEL
// SIG // BQADggIBAAfmiFEN4sbgmD+BcQM9naOhIW+z66bM9TG+
// SIG // zwXiqf76V20ZMLPCxWbJat/15/B4vceoniXj+bzta1RX
// SIG // CCtRgkQS+7lTjMz0YBKKdsxAQEGb3FwX/1z5Xhc1mCRW
// SIG // S3TvQhDIr79/xn/yN31aPxzymXlKkVIArzgPF/UveYFl
// SIG // 2am1a+THzvbKegBvSzBEJCI8z+0DpZaPWSm8tv0E4XCf
// SIG // Mkon/VWvL/625Y4zu2JfmttXQOnxzplmkIz/amJ/3cVK
// SIG // C5Em4jnsGUpxY517IW3DnKOiPPp/fZZqkHimbdLhnPkd
// SIG // /DjYlPTGpQqWhqS9nhquBEKDuLWAmyI4ILUl5WTs9/S/
// SIG // fmNZJQ96LjlXdqJxqgaKD4kWumGnEcua2A5HmoDF0M2n
// SIG // 0O99g/DhO3EJ3110mCIIYdqwUB5vvfHhAN/nMQekkzr3
// SIG // ZUd46PioSKv33nJ+YWtvd6mBy6cJrDm77MbL2IK0cs0d
// SIG // 9LiFAR6A+xuJKlQ5slvayA1VmXqHczsI5pgt6o3gMy4S
// SIG // KfXAL1QnIffIrE7aKLixqduWsqdCosnPGUFN4Ib5Kpqj
// SIG // EWYw07t0MkvfY3v1mYovG8chr1m1rtxEPJdQcdeh0sVV
// SIG // 42neV8HR3jDA/czmTfsNv11P6Z0eGTgvvM9YBS7vDaBQ
// SIG // NdrvCScc1bN+NR4Iuto229Nfj950iEkSoYIDdjCCAl4C
// SIG // AQEwgeOhgbmkgbYwgbMxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // DTALBgNVBAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIg
// SIG // RFNFIEVTTjo3MjhELUM0NUYtRjlFQjElMCMGA1UEAxMc
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIlCgEB
// SIG // MAkGBSsOAwIaBQADFQC9/8WVY5DxE5xg1hnAr+m4nh4g
// SIG // HaCBwjCBv6SBvDCBuTELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEN
// SIG // MAsGA1UECxMETU9QUjEnMCUGA1UECxMebkNpcGhlciBO
// SIG // VFMgRVNOOjRERTktMEM1RS0zRTA5MSswKQYDVQQDEyJN
// SIG // aWNyb3NvZnQgVGltZSBTb3VyY2UgTWFzdGVyIENsb2Nr
// SIG // MA0GCSqGSIb3DQEBBQUAAgUA3uodujAiGA8yMDE4MDcw
// SIG // NzAwNTYyNloYDzIwMTgwNzA4MDA1NjI2WjB0MDoGCisG
// SIG // AQQBhFkKBAExLDAqMAoCBQDe6h26AgEAMAcCAQACAgKl
// SIG // MAcCAQACAheXMAoCBQDe6286AgEAMDYGCisGAQQBhFkK
// SIG // BAIxKDAmMAwGCisGAQQBhFkKAwGgCjAIAgEAAgMW42Ch
// SIG // CjAIAgEAAgMHoSAwDQYJKoZIhvcNAQEFBQADggEBACjO
// SIG // dufjBGsvs1+aDJOUK0HKQ2TkDJDttOtYpLaGTzKCWnVR
// SIG // 8OyJdVJrWdrTf1oRIQhFKQ7NO+ZPUQKLml+f5Sw0wp+3
// SIG // MT128o7AscqIbz9FebqHKn8x0pPWcfLBewts5kHfZyvP
// SIG // 8MmLxlpp171vchnbUr6xMwV9cn1V13CZkL6yRvBKxN+t
// SIG // os7vYP2VXx6/YIj11buDUIEF5vX1XW3IPpzJcF4ZF2tq
// SIG // UBR105SAiydO+TiI5GijfXoHV2Qgx7/HdrgyNCW33uaA
// SIG // bNWS+/FjoBD4y9lwv3t0ZuoRWNyjXG1LD3+4cNvivJy0
// SIG // V5HWUpeJaoh6tSbtL3QgFdcxhVsJX2oxggL1MIIC8QIB
// SIG // ATCBkzB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQD
// SIG // Ex1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAIT
// SIG // MwAAALI1BWg3IhwNpwAAAAAAsjANBglghkgBZQMEAgEF
// SIG // AKCCATIwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEE
// SIG // MC8GCSqGSIb3DQEJBDEiBCDWOH6K8h3K5L3WxzEhnH4c
// SIG // t0FVa6Oy/PsBfUiH60GPNTCB4gYLKoZIhvcNAQkQAgwx
// SIG // gdIwgc8wgcwwgbEEFL3/xZVjkPETnGDWGcCv6bieHiAd
// SIG // MIGYMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTACEzMAAACyNQVoNyIcDacAAAAAALIwFgQUgSd6NbxZ
// SIG // 8ls9c/wHeO+yY32ycMQwDQYJKoZIhvcNAQELBQAEggEA
// SIG // kl4tZUZ6NbGFJLCuOwP5ajQhvwzWMC+9NnnfDNX+knYm
// SIG // V4VERTGGEDHT7M78qP1G0I0jJjaBcYWkW23jDb/nR+2o
// SIG // U4Lqq40AnNwdV+zdPhFnrCqAEENDd+qdKNQXlNhXw8cx
// SIG // lt/3vPmMQHMo+wIjFHrZ1z+5iVoXFfEhArvmXLhsxyv6
// SIG // H2oA1HBfXd5HBJb2qW/kykfxRSx4dWWfKAliMoWNSYyt
// SIG // lHk+pR30fTffJb+dV+v2cboBMVKVLYajgiTrM9Of+oFM
// SIG // Zi+6pwyE/rXhmDov6oF85afITns/hKdcT32/iKEDQ2W2
// SIG // 1MOtoHYvVeOnPEibPIdVF023AJgNwKS2Xg==
// SIG // End signature block
