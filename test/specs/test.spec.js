// Copyright (c) 2017 LancerComet
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const Lens = require('../../dist/lens.umd')

describe('Lens.js testing.', () => {
  const targetElement = document.createElement('div')
  targetElement.id = 'target-element'

  const child1 = document.createElement('h1')
  child1.innerHTML = 'Child 1'
  child1.style.height = '30px'

  const child2 = document.createElement('p')
  child2.innerHTML = 'Child 2'
  child2.style.display = 'none'
  child2.style.height = '20px'

  targetElement.appendChild(child1)
  targetElement.appendChild(child2)

  const styleSheets = document.createElement('style')
  styleSheets.innerHTML = '.lens-transition { transition: all ease .4s; background-color: red }'
  document.head.appendChild(styleSheets)

  document.body.appendChild(targetElement)

  const lens = new Lens('#target-element')
  lens.observe({
    deepWatch: true
  })

  it('"targetElement" should be a HTMLElement.', () => {
    expect(Object.prototype.toString.call(targetElement)).equal('[object HTMLDivElement]')
  })

  it('"targetElement" has 2 children.', () => {
    expect(targetElement.children.length).equal(2)
  })

  it('"lens" should be an "instance" of "Lens".', () => {
    expect(lens.constructor).equal(Lens)
  })

  it('Height must be 30.', (done) => {
    show1()
    setTimeout(() => {
      const child1Height = lens.$getContainerSize().height
      expect(child1Height).equal(30)
      done()
    }, 500)
  })

  it('Height must be 20.', (done) => {
    show2()
    setTimeout(() => {
      const child2Height = lens.$getContainerSize().height
      expect(child2Height).equal(20)
      done()
    }, 500)
  })

  it('Height must be 30 again.', (done) => {
    show1()
    setTimeout(() => {
      const child1Height = lens.$getContainerSize().height
      expect(child1Height).equal(30)
      done()
    }, 500)
  })

  function show1 () {
    child1.style.display = 'block'
    child2.style.display = 'none'
  }

  function show2 () {
    child1.style.display = 'none'
    child2.style.display = 'block'
  }
})