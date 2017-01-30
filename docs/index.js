const Component1 = {
  template: `
    <div>
      <h2>Hello! :)</h2>
      <p>Hi! I'm... uh... some text here :)</p>
      <p>Just click the button and let's see what is going to be happened...</p>
    </div>
  `
}

const Component2 = {
  template: `
    <div>
      <p>It seems that you don't like me... That's cool, it's not a big deal :)</p>
      <p>But as you can see, this section is a little shorter now...</p>
    </div>
  `
}

const Component3 = {
  template: `
    <div>
      <p>And what important is, you see the transition.</p>
    </div>
  `
}

const Component4 = {
  data () {
    return {
      text: '',
      show: 0
    }
  },

  template: `
    <div>
      <p>It's not very hard, but you always want it to be easy right?</p>
      <p>And what much more important is, you don't know the height of something incoming!</p>
      <p>Let's try this:</p>
      <p>
        <button @click="changeText">Click me!</button>
      </p>
      <code v-html="text"></code>
    </div>
  `,

  methods: {
    changeText () {
      const textPools = [
        `
        <p>ElementaryOS is a Linux distribution based on Ubuntu. It is the flagship distribution to showcase the Pantheon desktop environment, similar to how Linux Mint introduced Cinnamon.</p>
        <p>Although not contrary to the GNU philosophy, these deliberate design choices diverge from what most GNU/Linux distributions opt for: a freedom to set up and customize one's own desktop environment. The Human Interface Guidelines of the elementary OS project focus instead on immediate usability with a gentle learning curve, rather than full-fledged customization. The three core rules the developers set for themselves were "concision", "avoid configuration" and "minimal documentation".</p>`,
        `From Wikipedia, the free encyclopedia.`,
        `
          <div style="max-width: 500px; margin: 0 auto; background-color: #fff; border-radius: 10px; padding: 30px; color: #35495e;">
            <h2 style="margin:20px 0 30px 0;">A Popup!</h2>
            <div>
              <p style="margin-bottom: 30px;">Please provide your username and password.</p>
              <div style="margin-bottom: 10px;"><input type="text" placeholder="Username."/></div>
              <div><input type="password" placeholder="Password."/></div>
            </div>
          </div>
        `,
        `Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is very easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.`
      ]
      if (this.show >= textPools.length) {
        this.show = 0
      }
      this.text = textPools[this.show]
      this.show++
    }
  }
}

const Component5 = {
  template: 
  `
    <div>
      <p>Wow! You have know everything about me!</p>
      <p>Don't forget to check out deocument and have a try! :)</p>
    </div>
  `
}

const Root = new Vue({
  el: 'app',

  data: {
    show: 1,
    labels: ['I don\'t want to see you.', 'Uh.', 'Is that hard to do?', 'Yeah!', 'I\'ll check it out later!']
  },

  computed: {
    currentComponent () {
      return this.show.toString()
    },

    label () {
      return this.labels[this.show - 1]
    }
  },

  template:
    `
      <div class="t-center">
        <div class="tour-ctnr m-auto">
          <transition name="enter">
            <component v-bind:is="currentComponent"></component>                            
          </transition>
          <button @click="change">{{label}}</button>
        </div>
      </div>
    `,
  components: {
    1: Component1,
    2: Component2,
    3: Component3,
    4: Component4,
    5: Component5
  },

  methods: {
    change () {
      if (this.show === this.labels.length) {
        this.show = 1;
        return;
      }
      this.show++
    }
  },

  mounted () {
    const tourLens = new Lens('.tour-ctnr')
    tourLens.observe({ deepWatch: true })
    window.addEventListener('resize', function () { tourLens.update() })    
  }
})

const ShowCase = new Vue({
  el: 'show-case',

  template:
  `
    <div class="show-case-ctnr" v-html="content"></div>
  `,

  data: {
    contents: [
      `<div>
        <div class="scale-in-ease" style="width: 80px; height: 80px; border-radius:50%; background-color: #fff;"></div>
      </div>`,
      `
      <div>
        <div style="width: 100px; height: 80px; position: relative; margin: 0 auto 20px auto; background-color: #fff; border-radius: 4px; display: inline-block; vertical-align: top;">
          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #35495e; position: absolute; right: 5px; top: 5px;"></div>
        </div>
        <div style="width: 80px; height: 10px; background-color: #fff; border-radius: 4px;"></div>
        <div style="width: 20px; height: 10px; background-color: #fff; margin: 10px 0; border-radius: 4px;"></div>
        <div style="width: 50px; height: 10px; background-color: #fff; border-radius: 4px;"></div>
        <div style="width: 150px; height: 10px; margin-top: 10px; background-color: #fff; border-radius: 4px;"></div>
      </div>
      `,
      `<div style="color: #fff">
        <p style="font-size: 30px">Greeting from Lens.js! :)</p>
      </div>`,
      `
      <div style="color: #fff; text-align: left;" class="move-in-top">
        <div>The height is</div>
        <div style="font-size: 18px; font-weight: bold; margin: 10px 0">Changing</div>
        <div>with</div>
        <div style="font-size: 30px; font-weight: bold; margin-top: 10px">Transition.</div>
      </div>
      `
    ],

    show: 0,
    interval: null
  },

  computed: {
    content () {
      return this.contents[this.show]
    }
  },

  methods: {
    transform () {
      if (this.interval) { return }
      this.interval = setInterval(() => {
        if (this.show >= this.contents.length - 1) {
          this.show = 0
        } else {
          this.show++
        }
      }, 2000)
    },

    lensInit () {
      const showCaseLens = new Lens('.show-case-ctnr')
      showCaseLens.observe({ deepWatch: true })
    },

    stopTransform () {
      clearInterval(this.interval)
      this.interval = null
    },

    registerEvents () {
      const events = ['scroll', 'resize']
      events.forEach(event => {
        window.addEventListener(event, () => {
        const scrollTop = document.body.scrollTop
        scrollTop > 350
          ? this.stopTransform()
          : this.transform()
        })
      })
    }
  },

  mounted () {
    this.lensInit()
    this.transform()
    this.registerEvents()
  }
})




