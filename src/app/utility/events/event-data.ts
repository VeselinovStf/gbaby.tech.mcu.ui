export default class EventData {
    name: string | undefined;
    value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }
}