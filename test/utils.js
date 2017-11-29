/* eslint-disable no-unused-expressions */
const expect = require('chai').expect

const {
    _reduceObject,
    argExists,
    extractOption,
} = require('../lib/utils')

describe('Utils', function () {

    describe('_reduceObject', function () {

        const testObj = {
            reduce: _reduceObject,
        }

        it('should confirm an existinp argument', function () {

            expect(testObj.reduce()).to.deep.equal({})

        })

    })

    describe('argExists', function () {

        it('should confirm an existinp argument', function () {

            expect(argExists(process.argv[0])).to.be.true

        })

        it('should reject a non-existent key', function () {

            expect(argExists('a non-existent key')).to.be.false

        })

    })

    describe('extractOption', function () {

        const TEST_VAL = 'TEST_VAL'
        const testOnject = {
            propA: true,
            propB: false,
            propC: TEST_VAL,
        }

        const expactedTesult = {
            propA: true,
            propB: false,
        }

        it('should return value of a given property', function () {

            expect(extractOption(testOnject, 'propC')).to.equal(TEST_VAL)

        })

        it('property shoud be removed from object', function () {

            expect(testOnject).to.deep.equal(expactedTesult)

        })

    })

    describe('extractOption', function () {

        const TEST_VAL = 'TEST_VAL'
        const testOnject = {
            propA: true,
            propB: false,
            propC: TEST_VAL,
        }

        const expactedTesult = {
            propA: true,
            propB: false,
        }

        it('should return value of a given property', function () {

            expect(extractOption(testOnject, 'propC')).to.equal(TEST_VAL)

        })

        it('property shoud be removed from object', function () {

            expect(testOnject).to.deep.equal(expactedTesult)

        })

    })

})
