class Helper {
    constructor () {
        this.browserCount          = 0;
        this.executed              = false;
        this.browserEnterHookCount = 0;
        this.executionCount        = 0;

        this.waitAllBrowsersPromise = new Promise(resolve => {
            this.waitResolver = resolve;
        });

        this.donePromise = new Promise(resolve => {
            this.doneResolver = resolve;
        });
    }

    static async executeFn (fn, t) {
        if (typeof fn === 'function') {
            try {
                await fn(t);
            }
            catch (err) {
                t.testRun.errOnHook = err;
            }
        }
    }

    static shouldExecuteFixtureHook (t) {
        const test      = t.testRun.test;
        const tests     = test.fixture.testFile.collectedTests;
        const testIndex = tests.indexOf(test);

        const isInFixtureBeforeEachHook = t.testRun.phase === 'inFixtureBeforeEachHook';
        const isInFixtureAfterEachHook  = t.testRun.phase === 'inFixtureAfterEachHook';

        const isFirstTestInFixture = testIndex === 0 && isInFixtureBeforeEachHook;
        const isLastTestInFixture  = testIndex === tests.length - 1 && isInFixtureAfterEachHook;

        return isFirstTestInFixture || isLastTestInFixture;
    }

    async executeHook (fn, t) {
        this.browserCount = t.testRun.opts.browsers.length;

        await this.waitAllBrowsersEnterHook();

        await this.executeFn(fn, t);

        await this.waitAllBrowsersLeaveHook();
    }

    async waitAllBrowsersEnterHook () {
        this.browserEnterHookCount++;

        if (this.browserEnterHookCount === this.browserCount)
            this.waitResolver();

        await this.waitAllBrowsersPromise;
    }

    async waitAllBrowsersLeaveHook () {
        if (this.executionCount === this.browserCount)
            this.doneResolver();

        await this.donePromise;
    }

    async executeFn (fn, t) {
        const needExecute = !this.executed && t.browser.alias === t.testRun.opts.browsers[0];

        if (needExecute) {
            this.executed = true;

            await Helper.executeFn(fn, t);
        }

        this.executionCount++;
    }
}

export function oncePerFixture (fn) {
    let helper = new Helper();

    return async function (t) {
        if (!Helper.shouldExecuteFixtureHook(t))
            return;

        await helper.executeHook(fn, t);

        if (t.testRun.errOnHook)
            throw t.testRun.errOnHook;
    };
}

export function oncePerTest (fn) {
    let helper = new Helper();

    return async function (t) {
        await helper.executeHook(fn, t);

        helper = new Helper();

        if (t.testRun.errOnHook)
            throw t.testRun.errOnHook;
    };
}
