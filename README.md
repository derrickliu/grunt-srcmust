# grunt-srcmust

> resource in page cache control

两种方式控制页面静态资源上的缓存

（css里面的图片缓存控制也可以做到，另外：grunt-bgmust是单独做给css的image缓存控制的）

1、依赖grunt-rev，遍历rev的新文件，然后替换页面上相应的引用，类似'12345678.jquery.js'

2、不依赖grunt-rev，遍历文件，拿到文件的md5，在文件后面加上版本，类似'jquery.js?12345678'

（注意：如果要清掉页面上生成的md5，可以打开源代码，里面有相应的注释模块，放开后注释掉对应的生成模块即可使用）

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-srcmust --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-srcmust');
```

## The "srcmust" task

### Overview
In your project's Gruntfile, add a section named `srcmust` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  srcmust: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.type
Type: `String`
Default value: `rename`

更改页面上引用资源的的方式
如页面有这个引用：
`<script src="jquery.js"></script>`

默认rename的结果
`<script src="12345678.jquery.js"></script>`

类似加版本号，version（其实可以随便写一个不是rename的即可）
`<script src="jquery.js?12345678"></script>`

##### 注意：如果type 不是rename 不需要依赖grunt-rev

#### options.dirs
Type: `Array`
Default value: `[]`

需要遍历的目录数组，推荐使用这个，后面的jsdir/cssdir/imagesdir为了兼容老版本

#### options.prev
Type: 'String'
Default value: ''

引入这个属性是为了解决不同文件夹下的名字相同文件版本控制问题，搭配dirs使用

#### options.jsdir
Type: `String`
Default value: `''`

js dir.

#### options.cssdir
Type: `String`
Default value: `''`

css dir.

#### options.imagesdir
Type: `String`
Default value: `''`

images dir.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  srcmust: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
主要步骤是：

1、clean，清掉release目录的文件（清掉是为了防止release下面的文件被重复md5）

2、cssmin、requirejs，业务的css、js的打包压缩

3、rev，把release下面指定的文件md5

4、srcmust，根据页面上引用的资源去匹配，替换。

```js
grunt.initConfig({
  srcmust: {
    options: {
      type: 'v' //全局设置更改方式，rename或加版本
    },
    contact: {
      options: {
        dirs: ['release/css/', 'release/js/contact/'],
        cssdir: 'release/css2/'
      },
      files: [
        {
          src: 'page/main.jsp'
        }
      ]
    }
  },
});
```

新增属性prev的使用方法:

使用场景：

控制按需加载模块的版本，比如requirejs下的场景：

有a,b,c,...,h,i等模块，每个下面几乎都有一个view.js，如果需要做版本控制，
可以这样配置options: { prev: 'js/', dirs: ['a/view.js','b/view.js',...,h/view.js,i/view.js]}
```js
grunt.initConfig({
  srcmust: {
    options: {
      prev: 'v' //全局设置更改方式，rename或加版本
    },
    contact: {
      options: {
        prev: 'release/js/',
        dirs: ['a/view.js', 'b/view.js', 'c/view.js'],
      },
      files: [
        {
          src: 'page/main.jsp'
        }
      ]
    }
  },
});

//页面部分的js
require.config({
  baseUrl: 'release/js/'
  paths: {
    'a/view': 'a/view.js',
    'b/view': 'b/view.js',
    'c/view': 'c/view.js'
  }
});

//grunt之后
require.config({
  baseUrl: 'release/js/'
  paths: {
    'a/view': 'a/view.js?11111111',
    'b/view': 'b/view.js?22222222',
    'c/view': 'c/view.js?33333333'
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
