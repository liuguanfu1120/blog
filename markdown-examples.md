# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).

## Insert figure with captions and hyper reference

### With href and markdown math equation

```html
<figure style="text-align: center;">
  <img src="Fig1" alt="Fig1" style="display: block; margin: 0 auto; width: 120%; height: auto;">
  <figcaption>
 Figure 3 from <a href="https://www.science.org/doi/10.1126/science.abl7759">Feng et al. (2022)</a>
 
$$
1+1
$$

  </figcaption>
</figure>
```

### Without href nor markdown math equation

```html
<figure style="text-align: center;">
  <img src="Fig1" alt="Fig1" style="display: block; margin: 0 auto; width: 120%; height: auto;">
  <figcaption>
 

  </figcaption>
</figure>
```

## Angstrom

$\lambda>3646\mathrm{\mathring{A}}$

<!-- In Paste Image Extension, the default paste pattern is ${imageSyntaxPrefix}${imageFilePath}${imageSyntaxSuffix} -->

## How to insert image on GitHub

An example is as follows,

```markdown
![alt](https://github.com/liuguanfu1120/blog/blob/main/Code/Python/Secondary-Axes-fig/output_6_1.png?raw=true)
```
