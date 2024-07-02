{
    "targets": [{
        "target_name": "node-file-mapping",
        "sources": [
            "src/node-file-mapping.cpp"
        ],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').targets\"):node_addon_api_except",
        ],
        "cflags_cc": [ "-std=c++17" ],
        "msvs_settings": {
            "VCCLCompilerTool": {
                "AdditionalOptions": [ "-std:c++17" ]
            }
        }
    }]
}