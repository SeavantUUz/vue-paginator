# vue-paginator

> The simplest plugin to support your pagination need.

## Setup

Just download this script in anywhere your project could find it.

```javascript
Var VuePaginator = require('./vue-paginator.js')
```

## Dependency

No, it doesn't depend any third-dependencies except Vue.js --- anyway, it is a plugin to Vue.js.

## Suggestion

I think it is a simple tutorial to know how to write a plugin to vue.js. If it is possible, please read it.

If you wanted to use this script by npm, please mail me. I would learn some basic rules to use npm --- as you see, I'm
not familiar with modern js.

## Motivation

I know there are other vue.js plugins to paginate. Like [vue-paginate](https://github.com/TahaSh/vue-paginate).

It is a good project and have a good code style and the author is a good guy. I promise.

So why did I write this project?

Because when did I use vue-paginate, I found I could't use it very well. So I decided to write another to support my own job.

Maybe when you see this sentences, [vue-paginate](https://github.com/TahaSh/vue-paginate). could be strong enough. 
So you could try to use it.

## Usage

modify from [vue-paginate](https://github.com/TahaSh/vue-paginate).

```javascript
new Vue({
  el: '#app',
  data: {
    langs: ['PHP', 'JavaScript', 'HTML', 'CSS', 'Ruby', 'Python']
  }
});
```

```javascript
<!-- data -->
<ul v-paginator:items="langs" :perp="4" >
  <li v-for="lang in langs">
    {{ lang }}
  </li>
</ul>

<!-- links -->
<ul>
  <li v-for="page in iterPage(pages())">
    <a @click="to(page)" href="#">
      {{ page }}
    </a>
  </li>
</ul>
```

**:perp** means **perPageItems**, **pages** is a property which I injected to the context. it is a list of pages number;
**to** is a method to change the page.

if you want to use nextPage and prevPage, just modify the example like this:

```html
    <a @click="prev()"  href="#">
    上一页
    </a>
    <a @click="next()" href="#">
    下一页
    </a>
```

It is also that I injected **prev()** method and **next()** method to context.

I also supplied you these methods or properties:

* hasPrev()
* hasNext()
* originalList

If you want to toggle next/prev button when you clicked, you could write as this:

```html
    <a @click="prev()" v-show="hasPrev()"  href="#">
    prev
    </a>
    <a @click="next()" v-show="hasNext()" href="#">
    next
    </a>
```

Maybe you prefer hasPrev/hasNext are properties rather than methods. I made some tests on these, and I found it is difficult to trigger watcher updating values So I had to abandon this idea.

Remember, you could use them even if products are got by async.

Issue me if any bugs found.




