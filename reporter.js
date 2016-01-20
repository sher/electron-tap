;(function () {
  var tape = require('tape');
  var stream = tape.createStream({ objectMode: true });
  stream.on('data', report);

  var currentTest = null;

  function skip(row) {
    console.log(
      '%c⦿ %c%s',
      'color: DeepSkyblue;',
      'color: DimGray;',
      row.name
    );
  }

  function ok(row) {
    console.log(
      '%c✔︎ %c%s',
      'color: LimeGreen;',
      'color: DimGray;',
      row.name
    );
  }

  function fail(row) {
    var pattern = /node_modules\/tape/i;
    var stack = row.error.stack
      .split('\n')
      .map(function (line) { return line.trim() })
      .filter(function (_, i) { return i > 0 });

    console.group(
      '%c✘ %c%s',
      'color: OrangeRed;',
      'color: Black; background-color: Yellow; font-weight: normal;',
      row.name
    );

    console.log('expected:', row.expected, 'actual:', row.actual);
    console.groupCollapsed('%c%s', 'font-weight: normal;', 'stack trace')

    stack.forEach(function (line) {
      pattern.test(line) ?
        console.log('%c%s', 'color: DimGray;', line) :
        console.log('%c%s', 'color: Black; background-color: Yellow;', line);
    });

    console.groupEnd();

    console.groupEnd();
  }

  function report(row) {
    switch (row.type) {
    case 'test':
      console.group(row.name);
      break;
    case 'end':
      console.groupEnd();
      break;
    case 'assert':
      row.skip ? skip(row) : row.ok ? ok(row) : fail(row);
      break;
    }
  }
})();
