import { ref } from "vue";

const bus = ref(new Map());

export default function useEventBus() {
  function emit(event: string, ...args: any[]) {
    bus.value.set(event, args);
  }

  return { emit, bus };
}
