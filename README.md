grunt-h5bp-cachebuster
======================

> Grunt task to version assets in css files for [html5-boilerplate][h5bp] `.htaccess` snippet

## Installation

> This plugin requires Grunt `~0.4.0`

Install from `CLI` in directory with your `package.json` file

```bash
npm install grunt-h5bp-cachebuster --save-dev
```

Load tasks in your `Gruntfile.js`

```js
grunt.loadNpmTasks('grunt-h5bp-cachebuster');
```

If you don't using [html5-boilerplate][h5bp] thant you should add

``` ApacheConf
# .htaccess
 <IfModule mod_rewrite.c>
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^(.+)\.(\d+)\.(js|css|png|jpg|gif)$ $1.$3 [L]
 </IfModule>
```

for it to work. If you using [html5-boilerplate][h5bp] thant you should uncoment this section becouse it's commented by default

## The "h5bp_cachebuster" task

### Usage
In your project's Gruntfile, add a section named `h5bp_cachebuster` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  h5bp_cachebuster: {
    options {
      algorithm: 'crc32'
    },
    css: {
      expand: true,
      cwd: 'src/css/',
      src: '**/*.css',
      dest: 'dist/css/'
    }
  }
})
```
It would find all css files in `src/css/` dir (including subfolders) and create new files in `dist/css/` dir.
You can skip subfolders by changing `src` to `*.css`.
It's designed to work with .htaccess snippet from [html5-boilerplate][h5bp] so it will only change assets urls in css file (and not change assets file names in filesystem) by adding checksum before extension so it will change `url('image.jpg')` to `url('image.12345.jpg')`.

### Options

#### options.algorithm
Type: `String`
Possible values: `crc8`, `crc16`, `crc32`
Default value: `crc32`

[h5bp]: https://github.com/h5bp/html5-boilerplate/ "HTML5 Boilerplate"
