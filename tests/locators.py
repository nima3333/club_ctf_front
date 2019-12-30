from selenium.webdriver.common.by import By

class MainPageLocators(object):
    """A class for main page locators. All main page locators should come here"""
    LOGIN_BUTTON = (By.ID, 'login')
    REGSTER_BUTTON = (By.ID, 'register')

    USERNAME = (By.ID, 'pseudo')
    PASSWORD =  (By.ID, 'password')
    EMAIL = (By.ID, 'email')
    CONFIRM_PASSWORD =  (By.ID, 'confirmPassword')
    PHONE =  (By.ID, 'phone')
    ERROR_MESS = (By.XPATH, "//div[@role = 'alert']")

class SearchResultsPageLocators(object):
    """A class for search results locators. All search results locators should come here"""
    pass