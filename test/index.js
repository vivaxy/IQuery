/**
 * @since 150331 15:25
 * @author vivaxy
 */
var assert = chai.assert;
var result = 0;
var addResultValue = function (e) {
    e.stopPropagation();
    result++;
};

describe('on', function () {
    it('should select the 4 div in the nav', function () {
        var dom = $('nav div');
        dom.on('click', addResultValue);
        dom.trigger('click');
        dom.off('click', addResultValue);
        assert.equal(result, 4);
    });
});

describe('trigger', function () {
    it('should trigger 4 times add result value function', function () {
        var dom = $('nav div');
        dom.on('click', addResultValue);
        dom.trigger('click');
        dom.off('click', addResultValue);
        assert.equal(result, 8);
    });
});

describe('off', function () {
    it('should not trigger add result value function', function () {
        var dom = $('nav div');
        dom.on('click', addResultValue);
        dom.off('click', addResultValue);
        dom.trigger('click');
        assert.equal(result, 8);
    });
});

describe('$(`Dom object`)', function () {
    it('should select the 4 div in the nav', function () {
        var dom = $($('nav div'));
        dom.on('click', addResultValue);
        dom.trigger('click');
        dom.off('click', addResultValue);
        assert.equal(result, 12);
    });
});

describe('$(`HTMLElement object`)', function () {
    it('should select the first div in the nav', function () {
        var dom = $($('nav div')[0]);
        dom.on('click', addResultValue);
        dom.trigger('click');
        dom.off('click', addResultValue);
        assert.equal(result, 13);
    });
});

describe('$(`function`)', function () {
    it('should throw error: Dom: selector type error', function () {
        try {
            $(addResultValue);
        } catch (e) {
            assert.equal(e, 'Dom: selector type error');
        }
    });
});

describe('length', function () {
    it('should the length be 4', function () {
        var dom = $('nav div');
        assert.equal(dom.length, 4);
    });
});

describe('selector', function () {
    it('should the selector be `nav div`', function () {
        var dom = $('nav div');
        assert.equal(dom.selector, 'nav div');
    });
});

describe('each', function () {
    it('should select the divs, and execute in each divs', function () {
        var dom = $('nav div');
        var eleText = '';
        var indexValue = 0;
        dom.each(function (ele, index) {
            eleText += ele.innerText;
            indexValue += index;
        });
        assert.equal(eleText, '1234');
        assert.equal(indexValue, 6);
    });
});

describe('html', function () {
    it('should replace divs inner html', function () {
        var dom = $('nav div');
        dom.html('5');
        var eleText = '';
        dom.each(function (ele, index) {
            eleText += ele.innerText;
            ele.innerHTML = index+1;
        });
        assert.equal(eleText, '5555');
    });
});

