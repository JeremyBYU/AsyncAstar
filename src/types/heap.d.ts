export interface HeapT<T> {
  push(a: T);
  pop(): T;
  updateItem(a: T): void;
}
