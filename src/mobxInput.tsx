import {observable, action, computed} from 'mobx';
import { persist } from "mobx-persist";

export interface ModalWindow {
    name: string;
    surname: string;
    text: string;
    setName(name: string): void;
    setSurname(surname: string): void;
}

export class MobxInput implements ModalWindow {
    @persist @observable name = "";
    @persist @observable surname = "";
    
@computed public get text(): string {
    return `Здравствуйте ${this.name} ${this.surname}`;
}
@action.bound public setName(name: string): void {
    this.name = name;
  }
@action.bound public setSurname(surname: string): void {
    this.surname = surname;
  }
}