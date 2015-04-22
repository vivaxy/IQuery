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

describe('$(`selector`)', function () {
    it('should select the 4 div in the nav', function () {
        var dom = $($('nav div'));
        assert.equal(dom.length, 4);
    });
});

describe('$(`Dom object`)', function () {
    it('should select the 4 div in the nav', function () {
        var dom = $($('nav div'));
        assert.equal(dom.length, 4);
    });
});

describe('$(`HTMLElement object`)', function () {
    it('should select the first div in the nav', function () {
        var dom = $($('nav div')[0]);
        assert.equal(dom.length, 1);
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

describe('on(`type`, `function`)', function () {
    it('should select the 4 div in the nav', function () {
        var dom = $('nav div');
        dom.on('click', addResultValue);
        dom.trigger('click');
        dom.off('click', addResultValue);
        assert.equal(result, 4);
        result = 0;
    });
});

describe('trigger(`type`, `data`)', function () {
    it('should trigger 4 times add result value function', function () {
        var dom = $('nav div');
        dom.on('click', addResultValue);
        dom.trigger('click');
        dom.off('click', addResultValue);
        assert.equal(result, 4);
        result = 0;
    });
});

describe('off(`type`[, `function`])', function () {
    it('should not trigger add result value function', function () {
        var dom = $('nav div');
        dom.on('click', addResultValue);
        dom.off('click', addResultValue);
        dom.trigger('click');
        assert.equal(result, 0);
        result = 0;
    });
});

describe('each(function(`element`, `index`))', function () {
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

describe('html(`html`)', function () {
    it('should replace divs inner html', function () {
        var dom = $('nav div');
        dom.html('5');
        var eleText = '';
        dom.each(function (ele, index) {
            eleText += ele.innerText;
            ele.innerHTML = index + 1;
        });
        assert.equal(eleText, '5555');
    });
});

describe('append(`element`)', function () {
    it('should throw error: Dom: elements\' size does not fit the argument', function () {
        var dom = $('nav div');
        var div = document.createElement('div');
        div.innerText = '0';
        try {
            dom.append(div);
        } catch (e) {
            assert.equal(e, 'Dom: elements\' size does not fit the argument');
        }
    });
});

describe('append(`element`)', function () {
    it('should append a single div in nav', function () {
        var dom = $('nav');
        var div = document.createElement('div');
        div.innerText = '5';
        dom.append(div);
        assert.equal($('nav div').length, 5);
    });
});

describe('append(`html`)', function () {
    it('should append a single div in nav', function () {
        var dom = $('nav');
        dom.append('<div>6</div>');
        assert.equal($('nav div').length, 6);
    });
});

describe('addClass(`className`)', function () {
    it('should add class `test` to nav', function () {
        var dom = $('nav');
        dom.addClass('test');
        assert.equal(dom[0].className, 'test');
    });
});

describe('removeClass(`className`)', function () {
    it('should remove class `test` to nav', function () {
        var dom = $('nav');
        dom.removeClass('test');
        assert.equal(dom[0].className, '');
    });
});

describe('hasClass(`className`)', function () {
    it('should return if `nav` has class `test`', function () {
        var dom = $('nav');
        assert.equal(dom.hasClass('test'), false);
    });
});

describe('find(`selector`)', function () {
    it('should get the 6 divs in nav', function () {
        var dom = $('nav');
        var subDom = dom.find('div');
        assert.equal(subDom.length, 6);
    });
});

describe('data(`key`[, `value`])', function () {
    it('should set the data to nav', function () {
        var dom = $('nav');
        dom.data('nameSpace', 'myDomSelector');
        assert.equal(dom.data('nameSpace'), 'myDomSelector');
    });
});
