#if defined __linux__ || defined _WIN32

#include "node_file_mapping.h"

char *MappedBuffer::view()
{
    if (buffer != nullptr)
        return buffer;

#ifdef __linux__
    buffer = (char *)shmat(file, 0, 0);
#elif _WIN32
    buffer = (char *)MapViewOfFile(file, FILE_MAP_ALL_ACCESS, 0, 0, _bufferSize);
#endif

    return buffer;
}

MappedBuffer::MappedBuffer(const Napi::CallbackInfo &info) : ObjectWrap(info)
{
    Napi::Env env = info.Env();

    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return;
    }

    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, "You need to pass a string for buffer path")
            .ThrowAsJavaScriptException();
        return;
    }

    if (!info[1].IsNumber())
    {
        Napi::TypeError::New(env, "You need to pass a number for buffer size")
            .ThrowAsJavaScriptException();
        return;
    }

    _bufferPath = info[0].As<Napi::String>().Utf8Value();
    _bufferSize = info[1].As<Napi::Number>().Uint32Value();
}

Napi::Value MappedBuffer::Create(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    if (file != -1)
    {
        Napi::TypeError::New(env, "File mapping already exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    file = shmget(ftok(_bufferPath.c_str(), 1), _bufferSize, IPC_CREAT | S_IRUSR | S_IWUSR);

    if (file < 0)
    {
        Napi::TypeError::New(env, "Couldn't create file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#elif _WIN32
    if (file != nullptr)
    {
        Napi::TypeError::New(env, "File mapping already exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    file = CreateFileMappingA(
        INVALID_HANDLE_VALUE, // use paging file
        NULL,                 // default security
        PAGE_READWRITE,       // read/write access
        0,                    // maximum object size (high-order DWORD)
        _bufferSize,          // maximum object size (low-order DWORD)
        _bufferPath.c_str()); // path of mapping object

    if (file == nullptr)
    {
        Napi::TypeError::New(env, "Couldn't create file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

    return Napi::Buffer<char>::New(env, view(), _bufferSize);
}

Napi::Value MappedBuffer::Open(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    if (file != -1)
    {
        Napi::TypeError::New(env, "File mapping already exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    file = shmget(ftok(_bufferPath.c_str(), 1), _bufferSize, S_IRUSR | S_IWUSR);

    if (file < 0)
    {
        Napi::TypeError::New(env, "Couldn't open file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#elif _WIN32
    if (file != nullptr)
    {
        Napi::TypeError::New(env, "File mapping already exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    file = OpenFileMappingA(
        FILE_MAP_ALL_ACCESS,  // read/write access
        FALSE,                // do not inherit the name
        _bufferPath.c_str()); // path of mapping object

    if (file == nullptr)
    {
        Napi::TypeError::New(env, "Couldn't open file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

    return Napi::Buffer<char>::New(env, view(), _bufferSize);
}

Napi::Value MappedBuffer::Read(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    if (file < 0)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#elif _WIN32
    if (file == nullptr)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

    return Napi::Buffer<char>::New(env, view(), _bufferSize);
}

Napi::Value MappedBuffer::Write(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (!info[0].IsBuffer())
    {
        Napi::TypeError::New(env, "You need to pass a buffer for writing")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    Napi::Buffer<char> newBuffer = info[0].As<Napi::Buffer<char>>();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    if (file < 0)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#elif _WIN32
    if (file == nullptr)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

    if (newBuffer.Length() > _bufferSize)
    {
        Napi::TypeError::New(env, "Buffer is too big")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    std::memcpy(buffer, newBuffer.Data(), newBuffer.Length());

#ifdef _WIN32
    if (!FlushViewOfFile(buffer, _bufferSize))
    {
        Napi::TypeError::New(env, "Couldn't flush view of file (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

    return env.Undefined();
}

Napi::Value MappedBuffer::Close(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    if (buffer != nullptr)
        shmdt(buffer);

    if (file != -1)
        close(file);

    file = -1;
#elif _WIN32
    if (buffer != nullptr)
        UnmapViewOfFile(buffer);

    if (file != nullptr)
        CloseHandle(file);

    file = nullptr;
#endif

    buffer = nullptr;

    return env.Undefined();
}

Napi::Function MappedBuffer::GetClass(Napi::Env env)
{
    return DefineClass(
        env,
        "MappedBuffer",
        {
            MappedBuffer::InstanceMethod("create", &MappedBuffer::Create),
            MappedBuffer::InstanceMethod("open", &MappedBuffer::Open),
            MappedBuffer::InstanceMethod("read", &MappedBuffer::Read),
            MappedBuffer::InstanceMethod("write", &MappedBuffer::Write),
            MappedBuffer::InstanceMethod("close", &MappedBuffer::Close),
        });
}

Napi::Value GetVarTypeSize(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (!info[0].IsNumber()) {
        Napi::TypeError::New(env, "You need to pass a number for the variable type (Use the VarType enum)")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    int varType = info[0].As<Napi::Number>().Int32Value();

    switch (varType) {
        case 0:
            return Napi::Number::New(env, sizeof(char));
        case 1:
            return Napi::Number::New(env, sizeof(char16_t));
        case 2:
            return Napi::Number::New(env, sizeof(char32_t));
        case 3:
            return Napi::Number::New(env, sizeof(wchar_t));
        case 4:
            return Napi::Number::New(env, sizeof(unsigned char));

        case 5:
            return Napi::Number::New(env, sizeof(short int));
        case 6:
            return Napi::Number::New(env, sizeof(int));
        case 7:
            return Napi::Number::New(env, sizeof(long int));
        case 8:
            return Napi::Number::New(env, sizeof(long long int));

        case 9:
            return Napi::Number::New(env, sizeof(unsigned short int));
        case 10:
            return Napi::Number::New(env, sizeof(unsigned int));
        case 11:
            return Napi::Number::New(env, sizeof(unsigned long int));
        case 12:
            return Napi::Number::New(env, sizeof(unsigned long long int));

        case 13:
            return Napi::Number::New(env, sizeof(int8_t));
        case 14:
            return Napi::Number::New(env, sizeof(int16_t));
        case 15:
            return Napi::Number::New(env, sizeof(int32_t));
        case 16:
            return Napi::Number::New(env, sizeof(int64_t));

        case 17:
            return Napi::Number::New(env, sizeof(uint8_t));
        case 18:
            return Napi::Number::New(env, sizeof(uint16_t));
        case 19:
            return Napi::Number::New(env, sizeof(uint32_t));
        case 20:
            return Napi::Number::New(env, sizeof(uint64_t));

        case 21:
            return Napi::Number::New(env, sizeof(float));
        case 22:
            return Napi::Number::New(env, sizeof(double));

        case 23:
            return Napi::Number::New(env, sizeof(bool));
    }

    Napi::TypeError::New(env, "Variable type was not found")
        .ThrowAsJavaScriptException();
    return env.Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "MappedBuffer"), MappedBuffer::GetClass(env));
    exports.Set(Napi::String::New(env, "getVarTypeSize"), Napi::Function::New<GetVarTypeSize>(env));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)

#endif