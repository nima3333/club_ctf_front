from selenium.webdriver.common.by import By

class MainPageLocators(object):
    """A class for main page locators. All main page locators should come here"""
    LOGIN_BUTTON = (By.ID, 'login')
    REGSTER_BUTTON = (By.ID, 'register')
    ERROR_MESS = (By.XPATH, "//div[@role = 'alert']")

class SearchResultsPageLocators(object):
    """A class for search results locators. All search results locators should come here"""
    pass