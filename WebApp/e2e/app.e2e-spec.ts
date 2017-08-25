import { TourailPage } from './app.po';

describe('tourail App', function() {
  let page: TourailPage;

  beforeEach(() => {
    page = new TourailPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
