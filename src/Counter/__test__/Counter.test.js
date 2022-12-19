import React from "react";
//get the component that we want to test
import Counter from "../Counter";
//to render the component under testing
import { render } from "@testing-library/react";
//to able to use event
import { fireEvent } from "@testing-library/react";
//to assert
import "@testing-library/jest-dom/extend-expect";

//set global param
let getByTestId

beforeEach(() =>{
    const component = render(<Counter />)
    getByTestId = component.getByTestId
})

test("header render the correct text", () => {
    //get the element by test id: "data-testid" on the component.js
    const headerEl = getByTestId("h3")

    //assert the header has the correct text
    expect(headerEl.textContent).toBe("My Counter")
})

test("counter initial text is 0", () =>{
    const counterEl = getByTestId("counter")

    expect(counterEl.textContent).toBe("0")
})

test("input initial value is 1", () => {
    const inputEl = getByTestId("input")

    expect(inputEl.value).toBe("1")
})

test("add button render + icon", () => {
    const addBtn = getByTestId("add-btn")

    expect(addBtn.textContent).toBe("+")
})

test("subtract button render - icon", () => {
    const substractBtn = getByTestId("substract-btn")

    expect(substractBtn.textContent).toBe("-")
})

test("change value input working fine", () => {
    const inputEl = getByTestId("input")

    expect(inputEl.value).toBe("1")
    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }    
    })
    expect(inputEl.value).toBe("5")
})

test("click + add 1 to counter", () => {
    const addBtn = getByTestId("add-btn")
    const counterEl = getByTestId("counter")

    expect(counterEl.textContent).toBe("0")
    fireEvent.click(addBtn)
    expect(counterEl.textContent).toBe("1")
})

test("click - substract 1 from counter", () => {
    const substractBtn = getByTestId("substract-btn")
    const counterEl = getByTestId("counter")

    expect(counterEl.textContent).toBe("0")
    fireEvent.click(substractBtn)

    expect(counterEl.textContent).toBe("-1")
})

test("change the counter input and click on + will display counter = input", () => {
    const addBtn = getByTestId("add-btn")
    const counterEl = getByTestId("counter")
    const inputEl = getByTestId("input")

    expect(counterEl.textContent).toBe("0")
    fireEvent.change(inputEl, {
        target: {
            value: "10"
        }    
    })
    fireEvent.click(addBtn)

    expect(counterEl.textContent).toBe("10")
})

test("change the counter input and click on - will display counter = -input", () => {
    const substractBtn = getByTestId("substract-btn")
    const counterEl = getByTestId("counter")
    const inputEl = getByTestId("input")

    expect(counterEl.textContent).toBe("0")

    fireEvent.change(inputEl, {
        target: {
            value: "10"
        }    
    })
    fireEvent.click(substractBtn)

    expect(counterEl.textContent).toBe("-10")
})

test("adding and then substracting will display the correct counter number", () => {
    const addBtn = getByTestId("add-btn")
    const substractBtn = getByTestId("substract-btn")
    const counterEl = getByTestId("counter")
    const inputEl = getByTestId("input")

    fireEvent.change(inputEl, {
        target: {
            value: "6"
        }    
    })
    fireEvent.click(addBtn)
    fireEvent.click(addBtn)
    fireEvent.click(addBtn)
    fireEvent.click(substractBtn)

    expect(counterEl.textContent).toBe("12")

    fireEvent.change(inputEl, {
        target: {
            value: "9"
        }    
    })
    fireEvent.click(substractBtn)
    fireEvent.click(substractBtn)
    fireEvent.click(substractBtn)
    fireEvent.click(addBtn)

    expect(counterEl.textContent).toBe("-6")
})

test("adding and then substracting will display the correct counter number", () => {
    const addBtn = getByTestId("add-btn")
    const substractBtn = getByTestId("substract-btn")
    const counterEl = getByTestId("counter")
    const inputEl = getByTestId("input")

    expect(counterEl.textContent).toBe("0")
    expect(counterEl.className).toBe("")

    fireEvent.change(inputEl, {
        target: {
            value: "50"
        }    
    })
    fireEvent.click(addBtn)

    expect(counterEl.textContent).toBe("50")
    expect(counterEl.className).toBe("")

    fireEvent.click(addBtn)

    expect(counterEl.textContent).toBe("100")
    expect(counterEl.className).toBe("green")

    fireEvent.click(addBtn)

    expect(counterEl.textContent).toBe("150")
    expect(counterEl.className).toBe("green")

    fireEvent.click(substractBtn)

    expect(counterEl.textContent).toBe("100")
    expect(counterEl.className).toBe("green")

    fireEvent.click(substractBtn)

    expect(counterEl.textContent).toBe("50")
    expect(counterEl.className).toBe("")

    fireEvent.click(substractBtn)
    fireEvent.click(substractBtn)

    expect(counterEl.textContent).toBe("-50")
    expect(counterEl.className).toBe("")

    fireEvent.click(substractBtn)
    
    expect(counterEl.textContent).toBe("-100")
    expect(counterEl.className).toBe("red")

    fireEvent.click(substractBtn)
    
    expect(counterEl.textContent).toBe("-150")
    expect(counterEl.className).toBe("red")
})