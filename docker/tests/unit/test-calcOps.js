
const calcOps = require('../../src/calcOps.js');
var chai = require('chai');
var sinon = require('sinon');

chai.use(require('sinon-chai'));

chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

describe('Tests calculator library', function(){
  afterEach(function(){

  });
  describe('Tests add ops ', function(){
    const testdata = [
      {
        args: {x: 1, y: 0},
        expected: 1
      },
      {
        args: {x: 1, y: 1},
        expected: 2
      },
      {
        args: {x: 2, y: 71},
        expected: 73
      }
    ];
    testdata.forEach(function(test){
      it(`Adds   ${test.args.x}  and ${test.args.y} sum = ${test.expected}`, function(){
        let sum;
        sum = calcOps.add(test.args.x, test.args.y);
        expect(sum).to.equal(test.expected);
      });
    });



    it('Adds 1 and 0', function(){
      let sum;
      sum = calcOps.add(1,0);
      expect(sum).to.equal(1);
    });
    it('Adds 2 and 1', function() {
      let sum;
      sum = calcOps.add(1,2);
      expect(sum).to.equal(3);
    });
  });

  describe('Tests multiply ops', function(){
    describe('spy games', function() {
      let spy;
      afterEach(function(){
        spy.restore();

      });
      it("3 x 3 = 9", function(){
        let product;
        spy = sinon.spy(calcOps,"add");
        product = calcOps.multiply(3,3);
        expect(product).to.equal(9, "the product isn't 9!");
        expect(spy).to.be.calledThrice;
        expect(spy.callCount).to.equal(3);
        //expect(spy.firstCall).to.deep.equal([0,3]);
        expect(spy).to.be.calledWith(0,3);

      });
    });
    describe('Stub fun', function(){
      let stub;
      afterEach(function() {
        stub.restore();
      })
      it("4 x 3", function(){
        let product;
        stub = sinon.stub(calcOps, "add");
        //stub.onFirstCall().returns(4);
        stub.withArgs(4,4).returns(8);
        stub.withArgs(0,4).returns(4);
        stub.withArgs(8,4).returns(12);

        //stub.onSecondCall().returns(8);

        product = calcOps.multiply(4,3);
        expect(product).to.equal(12);
        expect(stub.callCount).to.equal(3);

      });
    });

  });

  describe('Test divideA', function(){

    it ('can divide async', function(done){
      let z = 0;

      calcOps.divideA(4,2,function(err, result){

        z= result;
        if(err){
          done(err);
          return;
        }

        expect(z).to.equal(2);
        done();
      });
      expect(z).to.equal(0);
    }).timeout(7000);
    it ("Errors on divide by ", function(done){
      calcOps.divideA(4,0,function(err, result){
        expect(err).to.not.be.null;
        done();
      });
    });
  });

  describe('Test subtractA', function(){
    it('works with 4 -2', function(){
      return calcOps.subtractA(4,2)
      .then(function(data) {
        expect(data).to.equal(2);

      });
    });
    it('works with 3 -2', function(){
      return calcOps.subtractA(3,2)
      .catch(function(err){
        expect(err).to.equal('3 is Eville');
      });
    });
  });

});