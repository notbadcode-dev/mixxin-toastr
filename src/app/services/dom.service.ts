import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DomService {
  constructor() {}

  addClassToElementByClassName(
    findClassName: string,
    addClassName: string
  ): void {
    const element = document.getElementsByClassName(findClassName)[0];
    if (element) {
      element.classList.add(addClassName);
    }
  }

  removeClassToElementByClassName(
    findClassName: string,
    addClassName: string
  ): void {
    const element = document.getElementsByClassName(findClassName)[0];
    if (element) {
      element.classList.remove(addClassName);
    }
  }

  existClassOnElementByClassName(
    findClassName: string,
    existClassName: string
  ): boolean {
    const element = document.getElementsByClassName(findClassName)[0];

    if (element) {
      const classList: string[] = Array.from(element.classList);
      return (
        classList.filter((className) => className === existClassName).length > 0
      );
    }

    return false;
  }
}
