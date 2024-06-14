# saucedemo-playwright
## Tutorial to run the project

### How to Run test cases

---

#### Run test cases by regression suite

```bash
npx playwright test -g "@regression"
```
This runs all test cases with *"@regression"* tag

---
#### Run test cases by suite

TC01_LoginPage.spec
```bash
npx playwright test -g "@TC01" --project chrome
```
_This runs TC01 in *chrome* browser_

TC02_ProductPage_StandardUser.spec
```bash
npx playwright test -g "@TC02" --project chrome
```

TC03_LoginPage_LockedourUser.spec
```bash
npx playwright test -g "@TC02" --project chrome
```
---
