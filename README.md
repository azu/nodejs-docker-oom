# Node.js + Docker OOM example

## Usage

```bash
docker build -t node-oom .
docker run -it --rm node-oom

<--- Last few GCs --->

[1:0x3a0ed4f0]     2752 ms: Scavenge 516.6 (551.1) -> 516.6 (551.1) MB, 115.2 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure;
[1:0x3a0ed4f0]     3791 ms: Mark-sweep 912.6 (947.4) -> 912.2 (947.4) MB, 501.1 / 0.0 ms  (+ 0.3 ms in 49 steps since start of marking, biggest step 0.1 ms, walltime since start of marking 1039 ms) (average mu = 1.000, current mu = 1.000) allocation failu

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

echo $?
133
```