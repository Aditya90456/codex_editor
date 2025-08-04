const { executeBlock, tokenize } = require('./dryrun'); // Refactor dryrun logic into dryrun.js

// dryrun.test.js
// We recommend installing an extension to run puppeteer tests.


describe('executeBlock', () => {
  test('handles variable declaration and assignment', () => {
    const code = `
      int x = 5;
      x = 10;
    `;
    const lines = tokenize(code);
    const steps = [];
    const vars = {};
    let stepCounter = 1;
    executeBlock(0, lines.length - 1, lines, steps, vars, () => stepCounter++);
    expect(steps[0].note).toMatch(/Initialize x = 5/);
    expect(steps[1].note).toMatch(/Assigned x = 10/);
  });

  test('handles increment and decrement', () => {
    const code = `
      int y = 1;
      y++;
      y--;
    `;
    const lines = tokenize(code);
    const steps = [];
    const vars = {};
    let stepCounter = 1;
    executeBlock(0, lines.length - 1, lines, steps, vars, () => stepCounter++);
    expect(steps[1].note).toMatch(/y incremented: 2/);
    expect(steps[2].note).toMatch(/y decremented: 1/);
  });

  test('handles addition', () => {
    const code = `
      int z = 2;
      z += 3;
    `;
    const lines = tokenize(code);
    const steps = [];
    const vars = {};
    let stepCounter = 1;
    executeBlock(0, lines.length - 1, lines, steps, vars, () => stepCounter++);
    expect(steps[1].note).toMatch(/Updated z: 5/);
  });

  test('handles cout output', () => {
    const code = `
      int a = 7;
      cout << a;
      cout << "hello";
    `;
    const lines = tokenize(code);
    const steps = [];
    const vars = {};
    let stepCounter = 1;
    executeBlock(0, lines.length - 1, lines, steps, vars, () => stepCounter++);
    expect(steps[1].cout).toBe(7);
    expect(steps[2].cout).toBe("hello");
  });

  test('handles if/else branching', () => {
    const code = `
      int b = 1;
      if (b == 1) {
        b = 2;
      } else {
        b = 3;
      }
    `;
    const lines = tokenize(code);
    const steps = [];
    const vars = {};
    let stepCounter = 1;
    executeBlock(0, lines.length - 1, lines, steps, vars, () => stepCounter++);
    expect(steps.some(s => s.note.includes('Checked (b == 1): TRUE'))).toBeTruthy();
    expect(steps.some(s => s.note.includes('Assigned b = 2'))).toBeTruthy();
  });

  test('handles for loop', () => {
    const code = `
      for (int i = 0; i < 2; i++) {
        cout << i;
      }
    `;
    const lines = tokenize(code);
    const steps = [];
    const vars = {};
    let stepCounter = 1;
    executeBlock(0, lines.length - 1, lines, steps, vars, () => stepCounter++);
    expect(steps.filter(s => s.note.includes('Loop Iteration')).length).toBe(2);
    expect(steps.filter(s => s.cout === 0).length).toBe(1);
    expect(steps.filter(s => s.cout === 1).length).toBe(1);
  });

  test('handles while loop', () => {
    const code = `
      int j = 0;
      while (j < 2) {
        j++;
      }
    `;
    const lines = tokenize(code);
    const steps = [];
    const vars = {};
    let stepCounter = 1;
    executeBlock(0, lines.length - 1, lines, steps, vars, () => stepCounter++);
    expect(steps.filter(s => s.note.includes('While Iteration')).length).toBe(2);
  });

  test('handles do-while loop', () => {
    const code = `
      int k = 0;
      do {
        k++;
      } while (k < 2);
    `;
    const lines = tokenize(code);
    const steps = [];
    const vars = {};
    let stepCounter = 1;
    executeBlock(0, lines.length - 1, lines, steps, vars, () => stepCounter++);
    expect(steps.filter(s => s.note.includes('Do-While Iteration')).length).toBe(2);
  });
});