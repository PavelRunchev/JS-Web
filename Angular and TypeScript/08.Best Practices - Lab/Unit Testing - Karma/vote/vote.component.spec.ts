import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  it('should return undefined', () => {
      const expectVote = new VoteComponent();
      expect(expectVote.upVote()).toBe(undefined);
  });

  it('should return zero', () => {
    const expectVote = new VoteComponent();
    expect(expectVote['totalVotes']).toBe(0);
  });

  it('should return one', () => {
    const expectVote = new VoteComponent();
    expectVote.upVote();
    expect(expectVote.totalVotes).toEqual(1);
  });

  it('should return negative one', () => {
    const expectVote = new VoteComponent();
    expectVote.downVote();
    expect(expectVote.totalVotes).toEqual(-1);
  });
});