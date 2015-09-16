'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');

describe('luxe:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(__dirname, './tmp')) // generate the generator files in the tmp directory
      .withPrompts({
            app_name: 'Test',
            author_name: 'Test',
            app_width: 960,
            app_height: 640,
            fullscreen: true,
            resizable: true,
            borderless: true,
            show_mouse_cursor: true,
            package: 'com.testing'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'luxe:state']])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'project.flow',
      'src/Main.hx',
      'assets/luxe_logo.png'
    ]);
  });

  after(function() {
        fs.unlinkSync('project.flow');
        fs.unlinkSync('src/Main.hx');
        fs.rmdirSync('src');
        fs.unlinkSync('assets/luxe_logo.png');
        fs.rmdirSync('assets');
  });

});

describe('luxe:state test', function () {
  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../generators/state'))
      .inDir(path.join(__dirname, './tmp')) // generate the generator files in the tmp directory
      .withArguments(['test'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file('src/states/Test.hx');
  });

  it('names class correctly', function() {
    assert.fileContent('src/states/Test.hx', /Test extends State/);
  });

  after(function() {
        fs.unlinkSync('src/states/Test.hx');
        fs.rmdirSync('src/states');
        fs.rmdirSync('src');
  });

});

describe('luxe:state test --splash', function () {
  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../generators/state'))
      .inDir(path.join(__dirname, './tmp')) // generate the generator files in the tmp directory
      .withArguments(['test'])
      .withOptions({splash: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file('src/states/Test.hx');
  });

  it('names class correctly', function() {
    assert.fileContent('src/states/Test.hx', /Test extends State/);
  });

  it('uses Splash template', function() {
    assert.fileContent('src/states/Test.hx', /fadein/);
    assert.fileContent('src/states/Test.hx', /fadeout/);
  });

  after(function() {
        fs.unlinkSync('src/states/Test.hx');
        fs.rmdirSync('src/states');
        fs.rmdirSync('src');
  });

});

describe('luxe:entity', function () {
  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../generators/entity'))
      .inDir(path.join(__dirname, './tmp')) // generate the generator files in the tmp directory
      .withArguments(['test'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file('src/entities/Test.hx');
  });

  it('names class correctly', function() {
    assert.fileContent('src/entities/Test.hx', /Test extends Entity/);
  });

  after(function() {
        fs.unlinkSync('src/entities/Test.hx');
        fs.rmdirSync('src/entities');
        fs.rmdirSync('src');
  });

});

describe('luxe:component', function () {
  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../generators/component'))
      .inDir(path.join(__dirname, './tmp')) // generate the generator files in the tmp directory
      .withArguments(['test'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file('src/components/Test.hx');
  });

  it('names class correctly', function() {
    assert.fileContent('src/components/Test.hx', /Test extends Component/);
  });

  after(function() {
        fs.unlinkSync('src/components/Test.hx');
        fs.rmdirSync('src/components');
        fs.rmdirSync('src');
  });

});
