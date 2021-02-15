export interface IEvent<T> {
	getType(): string,
	getData(): T
}
