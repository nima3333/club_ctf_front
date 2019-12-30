from elements import BasePageElement
from locators import MainPageLocators


class BasePage(object):
    """Base class to initialize the base page that will be called from all pages"""

    def __init__(self, driver):
        self.driver = driver


class MainPage(BasePage):
    """Home page action methods come here. I.e. login and register actions"""

    
    # Checks

    def is_title_matches(self):
        return "Club CTF" in self.driver.title
    
    def is_error_mess_matches(self, message):
        return message in self.driver.find_element(*MainPageLocators.ERROR_MESS).text

    # Clicks

    def click_login_button(self):
        element = self.driver.find_element(*MainPageLocators.LOGIN_BUTTON)
        element.click()
    
    def click_register_button(self):
        element = self.driver.find_element(*MainPageLocators.REGISTER_BUTTON)
        element.click()
        

    # Forms

    def login(self, username, password):
        pseudo_field = self.driver.find_element(*MainPageLocators.USERNAME)
        password_field = self.driver.find_element(*MainPageLocators.PASSWORD)
        set(pseudo_field, username)
        set(password_field, password)
        return

    def register(self, mail, username, password, password_conf, phone):
        email_field = self.driver.find_element(*MainPageLocators.EMAIL)
        pseudo_field = self.driver.find_element(*MainPageLocators.USERNAME)
        password_field = self.driver.find_element(*MainPageLocators.PASSWORD)
        confirm_password_field = self.driver.find_element(*MainPageLocators.CONFIRM_PASSWORD)
        phone_field = self.driver.find_element(*MainPageLocators.PHONE)
        set(email_field, username)
        set(pseudo_field, password)
        set(password_field, username)
        set(confirm_password_field, password)
        set(phone_field, username)
        return
    
