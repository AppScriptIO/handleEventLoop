"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.promiseProperRace = promiseProperRace;

function promiseProperRace(
promises,
count = 1,
results = [])
{
  promises = Array.from(promises);
  if (promises.length < count) {
    return Promise.reject('Race is not finishable or all promises rejected.');
  }

  let indexPromises = promises.map((p, index) => p.then(() => index, () => {throw index;}));

  return Promise.race(indexPromises).then(index => {
    let p = promises.splice(index, 1)[0];
    p.then(v => results.push(v));
    if (count === 1) {
      return results;
    }
    return properRace(promises, count - 1, results);
  }, index => {
    promises.splice(index, 1);
    return properRace(promises, count, results);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9wcm9taXNlUmFjZS5qcyJdLCJuYW1lcyI6WyJwcm9taXNlUHJvcGVyUmFjZSIsInByb21pc2VzIiwiY291bnQiLCJyZXN1bHRzIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlamVjdCIsImluZGV4UHJvbWlzZXMiLCJtYXAiLCJwIiwiaW5kZXgiLCJ0aGVuIiwicmFjZSIsInNwbGljZSIsInYiLCJwdXNoIiwicHJvcGVyUmFjZSJdLCJtYXBwaW5ncyI6Ijs7QUFFTyxTQUFTQSxpQkFBVDtBQUNMQyxRQURLO0FBRUxDLEtBQUssR0FBRyxDQUZIO0FBR0xDLE9BQU8sR0FBRyxFQUhMO0FBSUw7QUFDQUYsRUFBQUEsUUFBUSxHQUFHRyxLQUFLLENBQUNDLElBQU4sQ0FBV0osUUFBWCxDQUFYO0FBQ0EsTUFBSUEsUUFBUSxDQUFDSyxNQUFULEdBQWtCSixLQUF0QixFQUE2QjtBQUMzQixXQUFPSyxPQUFPLENBQUNDLE1BQVIsQ0FBZSxrREFBZixDQUFQO0FBQ0Q7O0FBRUQsTUFBSUMsYUFBYSxHQUFHUixRQUFRLENBQUNTLEdBQVQsQ0FBYSxDQUFDQyxDQUFELEVBQUlDLEtBQUosS0FBY0QsQ0FBQyxDQUFDRSxJQUFGLENBQU8sTUFBTUQsS0FBYixFQUFvQixNQUFNLENBQUMsTUFBTUEsS0FBTixDQUFhLENBQXhDLENBQTNCLENBQXBCOztBQUVBLFNBQU9MLE9BQU8sQ0FBQ08sSUFBUixDQUFhTCxhQUFiLEVBQTRCSSxJQUE1QixDQUFpQ0QsS0FBSyxJQUFJO0FBQy9DLFFBQUlELENBQUMsR0FBR1YsUUFBUSxDQUFDYyxNQUFULENBQWdCSCxLQUFoQixFQUF1QixDQUF2QixFQUEwQixDQUExQixDQUFSO0FBQ0FELElBQUFBLENBQUMsQ0FBQ0UsSUFBRixDQUFPRyxDQUFDLElBQUliLE9BQU8sQ0FBQ2MsSUFBUixDQUFhRCxDQUFiLENBQVo7QUFDQSxRQUFJZCxLQUFLLEtBQUssQ0FBZCxFQUFpQjtBQUNmLGFBQU9DLE9BQVA7QUFDRDtBQUNELFdBQU9lLFVBQVUsQ0FBQ2pCLFFBQUQsRUFBV0MsS0FBSyxHQUFDLENBQWpCLEVBQW9CQyxPQUFwQixDQUFqQjtBQUNELEdBUE0sRUFPSlMsS0FBSyxJQUFJO0FBQ1ZYLElBQUFBLFFBQVEsQ0FBQ2MsTUFBVCxDQUFnQkgsS0FBaEIsRUFBdUIsQ0FBdkI7QUFDQSxXQUFPTSxVQUFVLENBQUNqQixRQUFELEVBQVdDLEtBQVgsRUFBa0JDLE9BQWxCLENBQWpCO0FBQ0QsR0FWTSxDQUFQO0FBV0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGcm9tOiBodHRwczovL2dpdGh1Yi5jb20vQ2FzdHVyYW4vcHJvcGVyLXByb21pc2UtcmFjZS5qc1xuLy8g8J+TpiBwcm9taXNlIHByb3BlciByYWNlIC0gQW4gaW1wbGVtZW50YXRpb24gb2YgcHJvbWlzZS5yYWNlIHdpdGggZXhwZWN0ZWQgYmVoYXZpb3IuXG5leHBvcnQgZnVuY3Rpb24gcHJvbWlzZVByb3BlclJhY2UoXG4gIHByb21pc2VzLCAvLyBhcnJheSBvZiBwcm9taXNlcyB0byByYWNlXG4gIGNvdW50ID0gMSwgLy8gZm9yIHJlY3Vyc2l2ZSBjYWxsaW5nXG4gIHJlc3VsdHMgPSBbXSAvLyBhZ2dyZWdhdG9yXG4pIHtcbiAgcHJvbWlzZXMgPSBBcnJheS5mcm9tKHByb21pc2VzKTtcbiAgaWYgKHByb21pc2VzLmxlbmd0aCA8IGNvdW50KSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdSYWNlIGlzIG5vdCBmaW5pc2hhYmxlIG9yIGFsbCBwcm9taXNlcyByZWplY3RlZC4nKTtcbiAgfVxuICAgXG4gIGxldCBpbmRleFByb21pc2VzID0gcHJvbWlzZXMubWFwKChwLCBpbmRleCkgPT4gcC50aGVuKCgpID0+IGluZGV4LCAoKSA9PiB7dGhyb3cgaW5kZXg7fSkpO1xuICAgXG4gIHJldHVybiBQcm9taXNlLnJhY2UoaW5kZXhQcm9taXNlcykudGhlbihpbmRleCA9PiB7XG4gICAgbGV0IHAgPSBwcm9taXNlcy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgIHAudGhlbih2ID0+IHJlc3VsdHMucHVzaCh2KSk7XG4gICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BlclJhY2UocHJvbWlzZXMsIGNvdW50LTEsIHJlc3VsdHMpO1xuICB9LCBpbmRleCA9PiB7XG4gICAgcHJvbWlzZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gcHJvcGVyUmFjZShwcm9taXNlcywgY291bnQsIHJlc3VsdHMpO1xuICB9KTtcbn0iXX0=