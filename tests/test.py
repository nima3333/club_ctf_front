import unittest
from selenium import webdriver
import mainPage

class mainPageTest(unittest.TestCase):

    def setUp(self):
        options = webdriver.ChromeOptions()
        options.add_argument("user-data-dir=~/chromeTemp")
        options.add_argument("disable-web-security")
        self.driver = webdriver.Chrome(options=options)
        self.driver.get("localhost:3000")

    def test_search_in_python_org(self):
        # Load the main page
        main_page = mainPage.MainPage(self.driver)
        # Checks if "Club CTF" is in title
        assert main_page.is_title_matches(), "Club CTF title doesn't match."
        main_page.click_login_button()
        main_page.login("ok", "ok")

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()