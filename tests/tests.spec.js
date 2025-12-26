// @ts-check
//Copy-paste reference: setTimeout(() => {console.log("Safety pause")}, 500)
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('https://sweetshop.netlify.app//');
  //Click the login button (by id):
  await page.locator('[href*="/login"]').click();
  setTimeout(() => {console.log("Safety pause")}, 500)
  //First enters a random email and password and presses login:
  setTimeout(() => {console.log("Safety pause")}, 500)
  await page.locator('#exampleInputEmail').fill("test@gmail.com");
  await page.locator('#exampleInputPassword').fill("test");
  await page.locator('button', {hasText: 'Login'}).click()
  await expect(page).toHaveURL('https://sweetshop.netlify.app/00efc23d-b605-4f31-b97b-6bb276de447e.html') //a specific link to this account
});
setTimeout(() => {console.log("Safety pause")}, 500)


test('items have valid images', async ({ page }) => {
  const validLinks=[
      'img/cups.jpg',
      'img/straw.JPG',
      'img/discs.jpeg',
      'img/bonbon.jpg',
      'img/jellies.jpg',
      'img/salads.jpg',
      'img/tat.jpg',
      'img/wham.jpg', //in the web page itself, this image source has a typo causing the test to fail
      'img/whistles.jpg',
      'img/sherbert.jpg',
      'img/mix.jpg',
      'img/beans.jpg',
      'img/nerds.jpg',
      'img/drum.jpg',
      'img/bubbly.jpg',
      'img/dolly.jpg'
      //yes I did this all manually, don't ask
  ]
  await page.goto('https://sweetshop.netlify.app//');
  setTimeout(() => {console.log("Safety pause")}, 500)
  //had some issues with faulty button mapping, so I did it this way:
  await page.goto('https://sweetshop.netlify.app/sweets');
  const sources = await page.locator('.card img').evaluateAll(
      images => images.map(image => image.getAttribute('src'))
  );
  expect(sources.length).toBe(16);
  //The loop checks for every image in the list:
  for (const source of sources)
  {
      const isValid=validLinks.some(link=>source.endsWith(link));
      expect(isValid).toBe(true);
  }
})


test('correct order payment', async ({ page }) => {
    setTimeout(() => {console.log("correct order payment test")}, 500)
    await page.goto('https://sweetshop.netlify.app/sweets');
    await page.locator('.addItem[data-id="1"]').click();
    await page.locator('.addItem[data-id="2"]').click();
    await page.locator('.addItem[data-id="3"]').click();
    await page.goto('https://sweetshop.netlify.app/basket');
    await page.locator('#exampleRadios2').check({force: true});
    setTimeout(() => {console.log("Safety pause")}, 500);
    const checkboxText = await page.locator('#basketItems strong').innerText();
    const total = Number(checkboxText.replace('£', ''));
    expect(total).toBe(4.69);
    //This one was painful to figure out
})


test('check invalid login', async ({ page }) => {
    setTimeout(() => {console.log("invalid login test")}, 500)
    await page.goto('https://sweetshop.netlify.app/login');
    await page.locator('#exampleInputEmail').fill("testnogmail.com");
    await page.locator('#exampleInputPassword').fill("test");
    await page.locator('button', {hasText: 'Login'}).click();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/login');
})

test('adding items to basket', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/sweets');
    await page.locator('.addItem[data-id="1"]').click();
    await page.goto('https://sweetshop.netlify.app/basket');
    const exists = await page.locator('.my-0').innerText();
    expect(exists).toBe('Chocolate Cups');
})