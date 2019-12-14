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
        #Sets the text of search textbox to "pycon"
        #main_page.search_text_element = "pycon"
        #main_page.click_go_button()
        #search_results_page = mainPage.SearchResultsPage(self.driver)
        #Verifies that the results page is not empty
        #assert search_results_page.is_results_found(), "No results found."
        #main_page.login("ok", "ok")

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()