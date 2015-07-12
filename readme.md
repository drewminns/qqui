# PostCSS and Babel Flavoured Boilerplate

Gulp is pretty rad, and opens the door for some pretty cool tools. This is my build tool for new projects.

It's using some pretty rad tools that allow me to utilize some new features in Web Development.

## Build Process
The boilerplate allows you to work within a 'src' environment and output to a 'build' folder. All the CSS and JS will be written within the `src` folder, and then the Gulpfile will compile it to `build`. If there's any HTML to be written, either write it in the `build` folder, or create a task for Jade.

## Babel
![Babel](https://avatars0.githubusercontent.com/u/9637642?v=3&s=200)

[Babel](https://babeljs.io/) is a JavaScript compiler that allows us to write, and use ES2015 today. 

To get the low-down on what you can do with it, take a read on [https://babeljs.io/docs/learn-es2015/](https://babeljs.io/docs/learn-es2015/).

## PostCSS
![PostCSS](https://avatars1.githubusercontent.com/u/8296347?v=3&s=200)

Ok, so this stuff is rad. It's a tool that allows CSS and CSS plugins to be used to write some next level stuff. PostCSS is a tool that allows us to compile our CSS through plugins via JavaScript. It's like Sass, but has a community of developers that are creating plugins for all types of cool properties.

PostCSS on it's own is not exactly useful because it expects an array of plugins. This gulpfile includes an array of PostCSS plugins that are passed into the postcss function.

```
// Setup PostCSS Plugins
var processors = [
	require('cssnext')(),
	require('postcss-mixins')(),
	require('postcss-simple-vars')(),
	require('postcss-nested')(),
	require('postcss-import')({
			path: [paths.srcCSS]
		}),
	require('postcss-pseudo-class-enter')(),
	require('postcss-position')(),
	require('postcss-size'),
	require('postcss-quantity-queries')(),
	require('autoprefixer-core')({ browsers: ['last 2 version'] }),
	require('postcss-reporter')()
];

gulp.task('styles', function() {
	// ... snipped for brevity
	.pipe($.postcss(processors)) // <- Array goes in here
	// ... snipped for brevity
});
```

The plugins being used are: 

### cssnext 
[Details available here](https://github.com/cssnext/cssnext)

cssnext is a transpiler that lets you use CSS4 syntax in our code. The plugin will convert the syntax to CSS3.

CSS4 Syntax
```
:root {
  --mainColor: red;
}

a {
  color: var(--mainColor);
}
```

Output
```
a {
  color:red;
}
```

Read more about CSS4 Syntax here - [http://cssnext.io/features/](http://cssnext.io/features/)


### postcss-mixins
[Details available here](https://github.com/cssnext/cssnext)

postcss-mixins allows us to use Sass/Less/Styl style mixins in our CSS.

Input
```
@define-mixin blueText {
  color: blue;
  font-family: sans-serif;
}

main {
	@mixin blueText;
}
```

Output
```
main {
  color:blue;
  font-family:sans-serif;
}
```

### postcss-simple-vars
[Details available here](https://github.com/cssnext/cssnext)

Along with mixins, we can also use Sass style variables, rather than the verbose CSS4 style.

Input
```
$baseFont: 'Helvetica', Arial, sans-serif;

p {
	font-family: $baseFont;
}

```

### postcss-nested
[Details available here](https://github.com/cssnext/cssnext)

### postcss-import
[Details available here](https://github.com/cssnext/cssnext)

### postcss-pseudo-class-enter
[Details available here](https://github.com/cssnext/cssnext)

### postcss-position
[Details available here](https://github.com/cssnext/cssnext)

### postcss-size
[Details available here](https://github.com/cssnext/cssnext)

### postcss-quantity-queries
[Details available here](https://github.com/cssnext/cssnext)

### autoprefixer-core
[Details available here](https://github.com/cssnext/cssnext)

### postcss-reporter
[Details available here](https://github.com/cssnext/cssnext)




