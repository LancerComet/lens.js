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
    deepWatch: true,
    watchStyle: true
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

  describe('"show1" testing.', () => {
    show1()

    it('last height must be 30.', () => {
      expect(lens.$lastSize.height).equal(30)
    })

    it('Height must be 30.', done => {
      setTimeout(() => {
        const child1Height = lens.$getContainerSize().height
        expect(child1Height).equal(30)
        show2Test()
        done()
      }, 500)
    })
  })

  function show2Test () {
    describe('"show2" testing.', () => {
      it('last height must be 30.', () => {
        expect(lens.$lastSize.height).equal(30)
      })

      it('show2()', () => {
        show2()        
      })

      it('Height must be 20.', (done) => {
        setTimeout(() => {
          const child2Height = lens.$getContainerSize().height
          expect(child2Height).equal(20)
          show1AgainTest()
          done()
        }, 1000)
      })
    })
  }

  function show1AgainTest () {
    describe('"show1" testing 2nd.', () => {
      show1()

      it('Height must be 30.', (done) => {
        setTimeout(() => {
          const child1Height = lens.$getContainerSize().height
          expect(child1Height).equal(30)
          done()
        }, 1500)
      })
    })
  }

  
  function show1 () {
    child1.style.display = 'block'
    child2.style.display = 'none'
  }

  function show2 () {
    child1.style.display = 'none'
    child2.style.display = 'block'
  }
})