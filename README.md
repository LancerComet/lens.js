# Lens.js

![Building status](https://travis-ci.org/LancerComet/lens.js.svg?branch=master)

> Bring transition to size changing.

Change element's size with transition automaticlly when content is changed.

[Demo](https://lancercomet.github.io/lens.js/) is here.

## Quick start.

Let's see HTML:

```html
<!-- This is the content of your page. -->
<style>
#my-popup {
  width: 300px;
  padding: 30px;
  margin: 30px;
  background-color: red;
  color: white;
  font-size: 13px;
  border: 1px solid black;  
  border-radius: 10px;
}
</style>

<!-- Element to observe. -->
<div id="my-popup">
  <!-- Content will be changed, so is size. -->
  <content-inside></content-inside>
</div>
```

We need to do some small work first:

```html
<!-- For using Lens.js, -->
<!-- We must change it to: -->
<style>
#my-popup {
  color: white;
  font-size: 13px;
}

/* All styles related to box-sizing are transferred to this new role: */
#my-popup[data-lens="#my-popup"] {
  width: 300px;
  padding: 30px;
  margin: 30px;
  background-color: red;
  border: 1px solid black;
  border-radius: 10px;
}
</style>

<div id="my-popup">
  <content-inside></content-inside>
</div>
```

Then add transition style in your project.

```css
/*
   Add this rule to your project. Specify transition value as you wish.
   This will affect all Lens-instance's transition style.
 */
.lens-transition {
  transition: all ease .5s;
}

/*
   If you want something special:
*/
.lens-transition[data-lens="#my-popup"] {
  transition: all cubic-bezier(0.4, 0, 1, 1) .4s;
}

```

Then call lens in JavaScript:

```javascript
const Lens = require('lens.js')

// Observe height changing of "#my-popup".
const lens = new Lens('#my-popup')
lens.observe()  // Rock and roll!
```

That's it! Leave it alone and have a coffee. The height will be changed automaticlly.

## API.

### Create a new lens instance.

```javascript
const lens = new Lens('#some-element')
```

- Methods on lens instance:
  - observe: Start observing. Size will be changed with transition automaticlly.
  - disconnect: Stop observing, everything is going back to nomral.
  - update: Update size manually.

---

### Start observing.

Size will be changed with transition automaticlly.

```javascript
lens.observe()
```

---

### Start observing with configuration.

  Four options available:
  - width
  - height
  - watchStyle
  - deepWatch

```javascript
lens.observe({
  width: true,        // If enabled, width changing will be in transition.
                      // Default: true

  height: true,       // If enabled, height changing will be in transition.
                      // Default: true

  watchStyle: true,   // If enabled, every style changing in children element will be caught.
                      // Default: true.

  deepWatch: true     // If enabled, children in second and deeper level will be observed.
                      // Default: false.
})
```

---

### Stop observing.

No more changing. Everything is going back to nomral.

```javascript
lens.disconnect()
```

---

### Force update.

```javascript
lens.update()  // Interface will be update immediately.
```

You can use it with `resize` or something else.

```javascript
window.addEventListener('resize', () => {
  lens.update()
  console.log('Updated.')
  // ...
})
```

## License

MIT.