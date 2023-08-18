# Node.js + Docker OOM example

## Usage

### npm 9 exit status fine

- Define: `"packageManager": "npm@9.5.1"`

```bash
$ docker build -t nodejs-docker-oom .
$ make test
docker run --rm nodejs-docker-oom npm test

> nodejs-docker-oom@1.0.0 test
> jest --runInBand --silent=false --verbose --detectOpenHandles --forceExit test.js

<--- Last few GCs --->

[19:0x3c1997d0]     1700 ms: Mark-sweep 289.3 (323.8) -> 280.0 (323.6) MB, 154.5 / 0.0 ms  (+ 0.3 ms in 115 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 593 ms) (average mu = 0.894, current mu = 0.852) allocation fail[19:0x3c1997d0]     6134 ms: Mark-sweep 1819.4 (1857.4) -> 1818.5 (1857.4) MB, 685.7 / 0.0 ms  (+ 0.0 ms in 1 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 1165 ms) (average mu = 0.852, current mu = 0.845) allocation f

<--- JS stacktrace --->

FATAL ERROR: invalid table size Allocation failed - JavaScript heap out of memory
 1: 0xb43378 node::Abort() [node]
 2: 0xa724ac node::FatalError(char const*, char const*) [node]
 3: 0xd076d0 v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
 4: 0xd0785c v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]
 5: 0xed9398 v8::internal::Heap::EnsureFromSpaceIsCommitted() [node]
 6: 0x1123f4c  [node]
 7: 0x1124164 v8::internal::Handle<v8::internal::NumberDictionary> v8::internal::HashTable<v8::internal::NumberDictionary, v8::internal::NumberDictionaryShape>::EnsureCapacity<v8::internal::Isolate>(v8::internal::Isolate*, v8::internal::Handle<v8::internal::NumberDictionary>, int, v8::internal::AllocationType) [node]
 8: 0x1124820 v8::internal::Handle<v8::internal::NumberDictionary> v8::internal::Dictionary<v8::internal::NumberDictionary, v8::internal::NumberDictionaryShape>::Add<v8::internal::Isolate>(v8::internal::Isolate*, v8::internal::Handle<v8::internal::NumberDictionary>, unsigned int, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyDetails, v8::internal::InternalIndex*) [node]
 9: 0x102cf70  [node]
10: 0x10c6a08 v8::internal::JSObject::AddDataElement(v8::internal::Handle<v8::internal::JSObject>, unsigned int, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyAttributes) [node]
11: 0x1115c98 v8::internal::Object::AddDataProperty(v8::internal::LookupIterator*, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyAttributes, v8::Maybe<v8::internal::ShouldThrow>, v8::internal::StoreOrigin) [node]
12: 0x1118408 v8::internal::Object::SetProperty(v8::internal::LookupIterator*, v8::internal::Handle<v8::internal::Object>, v8::internal::StoreOrigin, v8::Maybe<v8::internal::ShouldThrow>) [node]
13: 0xd71f70 v8::internal::Builtin_ArrayPrototypeFill(int, unsigned long*, v8::internal::Isolate*) [node]
14: 0x160104c  [node]
Aborted
make: *** [test] Error 134

$ echo $?
2
```

## npm 6 + corepack + Jest Exit Status bug

- Define: `"packageManager": "npm@6.14.16"`

```bash
$ docker build -t nodejs-docker-oom .
$ make test
docker run -e NODE_ENV=test --rm nodejs-docker-oom npm test

> nodejs-docker-oom@1.0.0 test /
> jest --runInBand --silent=false --verbose --detectOpenHandles --forceExit test.js

FAIL home/node/.cache/node/corepack/npm/6.14.16/lib/test.js
  ● Test suite failed to run

    Your test suite must contain at least one test.

      at onResult (node_modules/@jest/core/build/TestScheduler.js:175:18)
      at node_modules/@jest/core/build/TestScheduler.js:304:17
      at node_modules/emittery/index.js:260:13
          at Array.map (<anonymous>)
      at Emittery.Typed.emit (node_modules/emittery/index.js:258:23)

e
<--- Last few GCs --->

[18:0xffffa22e9300]     2647 ms: Mark-sweep 324.3 (359.0) -> 293.9 (355.7) MB, 151.3 / 0.0 ms  (+ 0.4 ms in 113 steps since start of marking, biggest step 0.1 ms, walltime since start of marking 670 ms) (average mu = 0.935, current mu = 0.917) allocation [18:0xffffa22e9300]     7474 ms: Mark-sweep 1844.9 (1883.4) -> 1843.8 (1883.4) MB, 714.7 / 0.0 ms  (+ 0.0 ms in 1 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 1163 ms) (average mu = 0.869, current mu = 0.852) allocati

<--- JS stacktrace --->

FATAL ERROR: invalid table size Allocation failed - JavaScript heap out of memory

$ echo $?
0
```
