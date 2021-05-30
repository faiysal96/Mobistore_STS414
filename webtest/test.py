from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep, strftime
from random import randint
import pytest
import random
from selenium.webdriver.common.action_chains import ActionChains

# CASE- 
def test_login_success():
    driver = webdriver.Chrome()
    sleep(1)
    driver.get('http://localhost:3000/')
    sleep(2)
    username = driver.find_element_by_id('email')
    username.send_keys('test@mail.com')
    password = driver.find_element_by_id('password')
    password.send_keys('Test@1234')

    button_login = driver.find_element_by_id('loignBtn')
    sleep(2)
    button_login.click()
    sleep(1)

    assert "Mobi Store" in driver.title

    driver.close()

# def test_login_failure():
#     driver = webdriver.Chrome()
#     sleep(1)
#     driver.get('http://localhost:3000/')
#     sleep(2)
#     username = driver.find_element_by_id('email')
#     username.send_keys('test@mail.com')
#     password = driver.find_element_by_id('password')
#     password.send_keys('Test@12345')

#     button_login = driver.find_element_by_id('loignBtn')
#     sleep(2)
#     button_login.click()
#     sleep(1)

#     assert "Login" in driver.title

#     driver.close()

# def test_register_sucess():
#     driver = webdriver.Chrome()
#     sleep(1)
#     driver.get('http://localhost:3000/')
#     sleep(2)
#     button_login = driver.find_element_by_css_selector('button[tabIndex="-1"')
#     button_login.click()
#     sleep(1)

#     rand = random.randint(0,999) + random.randint(0,999)
#     firstName = driver.find_element_by_id('firstName')
#     firstName.send_keys('User ' + str(rand))
#     lastName = driver.find_element_by_id('lastName')
#     lastName.send_keys('LastName')
#     username = driver.find_element_by_id('regemail')
#     username.send_keys('test_'+str(rand)+ '@mail.com')
#     password = driver.find_element_by_id('regpassword')
#     password.send_keys('Test@12345')
#     sleep(1)
#     button_login = driver.find_element_by_id('regbtn')
#     button_login.click()
#     sleep(2)

#     assert "Mobi Store" in driver.title

#     driver.close()


# def test_register_failure():
#     driver = webdriver.Chrome()
#     sleep(1)
#     driver.get('http://localhost:3000/')
#     sleep(2)
#     button_login = driver.find_element_by_css_selector('button[tabIndex="-1"')
#     button_login.click()
#     sleep(1)

#     rand = random.randint(0,99)
#     firstName = driver.find_element_by_id('firstName')
#     firstName.send_keys('User ' + str(rand))
#     lastName = driver.find_element_by_id('lastName')
#     lastName.send_keys('LastName')
#     username = driver.find_element_by_id('regemail')
#     username.send_keys('test_'+str(rand)+ '@mail.com@inavlid@EMAIL')
#     password = driver.find_element_by_id('regpassword')
#     password.send_keys('Test@12345')
#     sleep(1)
#     button_login = driver.find_element_by_id('regbtn')
#     button_login.click()
#     sleep(2)

#     assert "Register" in driver.title

#     driver.close()



# def test_search_products():
#     driver = webdriver.Chrome()
#     driver.get('http://localhost:3000/')
#     sleep(2)
#     username = driver.find_element_by_id('email')
#     username.send_keys('test@mail.com')
#     password = driver.find_element_by_id('password')
#     password.send_keys('Test@1234')

#     button_login = driver.find_element_by_id('loignBtn')
#     sleep(1)
#     button_login.click()
#     sleep(4)

#     searchProduct = driver.find_element_by_id('searchProduct')
#     searchProduct.send_keys('iphone')
#     sleep(3)

#     content = driver.find_element_by_id('productsList')
#     contentLength = 0
#     products = content.find_elements_by_tag_name('a')
#     for div in products:
#         contentLength = contentLength+1

#     assert len(products) > 0
#     driver.close()


# def test_sign_out():
#     driver = webdriver.Chrome()
#     driver.get('http://localhost:3000/')
#     sleep(2)
#     username = driver.find_element_by_id('email')
#     username.send_keys('test@mail.com')
#     password = driver.find_element_by_id('password')
#     password.send_keys('Test@1234')

#     button_login = driver.find_element_by_id('loignBtn')
#     sleep(1)
#     button_login.click()
#     sleep(2)

#     accountBtn = driver.find_element_by_id('accountBtn')
#     accountBtn.click()
#     sleep(1)

#     accountBtn = driver.find_element_by_id('signOutText')
#     accountBtn.click()

#     assert "Login" in driver.title

#     driver.close()


# def test_sign_out():
#     driver = webdriver.Chrome()
#     driver.get('http://localhost:3000/')
#     sleep(2)
#     username = driver.find_element_by_id('email')
#     username.send_keys('test@mail.com')
#     password = driver.find_element_by_id('password')
#     password.send_keys('Test@1234')

#     button_login = driver.find_element_by_id('loignBtn')
#     sleep(1)
#     button_login.click()
#     sleep(2)

#     content = driver.find_element_by_id('productsList')
#     products = content.find_elements_by_tag_name('a')
#     if(products[0]):
#         addToCartBtns = products[0].find_elements_by_tag_name("button")
#         addToCart = None
#         for element in addToCartBtns:
#             if element.get_attribute('innerText') == 'ADD TO CART':
#                 addToCart = element

#         if addToCart:
#             addToCart.click()
#             sleep(3)
#             accountBtn = driver.find_element_by_id('cartBtn')
#             accountBtn.click()
#             sleep(1)

#             cartContent = driver.find_element_by_id("cartContent")

#             contentLength = 0
#             cartItems = cartContent.find_elements_by_tag_name('a')
#             for div in cartItems:
#                 contentLength = contentLength+1
            
#             assert contentLength > 1

#     driver.close()

# def test_payment_sucess():
#     driver = webdriver.Chrome()
#     driver.get('http://localhost:3000/')
#     sleep(2)
#     username = driver.find_element_by_id('email')
#     username.send_keys('test@mail.com')
#     password = driver.find_element_by_id('password')
#     password.send_keys('Test@1234')

#     button_login = driver.find_element_by_id('loignBtn')
#     sleep(1)
#     button_login.click()
#     sleep(2)

#     content = driver.find_element_by_id('productsList')
#     products = content.find_elements_by_tag_name('a')
#     if(products[0]):
#         addToCartBtns = products[0].find_elements_by_tag_name("button")
#         addToCart = None
#         for element in addToCartBtns:
#             if element.get_attribute('innerText') == 'ADD TO CART':
#                 addToCart = element
            
#         addToCart.click()
#         driver.get('http://localhost:3000/#/app/checkout')
#         sleep(3)


#         checkoutname = driver.find_element_by_id('checkoutname')
#         checkoutname.send_keys('User Name')
#         checkoutAdress = driver.find_element_by_id('checkoutAdress')
#         checkoutAdress.send_keys('ADDRESS')
#         checkoutAdress = driver.find_element_by_id('checkoutAdress')
#         checkoutAdress.send_keys('ADDRESS')

#         userPhone = driver.find_element_by_id('userPhone')
#         userPhone.send_keys('1092332993239')

#         notes = driver.find_element_by_id('notes')
#         notes.send_keys('ADDRESS')

#         placeOrderBtn = driver.find_element_by_id('placeOrderBtn')
#         sleep(1)
#         placeOrderBtn.click()
#         sleep(3)

#         driver.implicitly_wait(10)

#         otpInput = driver.find_element_by_id('otpInput')
#         otpInput.send_keys('12345')
#         sleep(3)

#         confirmOtp = driver.find_element_by_id('confirmOtp')
#         sleep(1)
#         confirmOtp.click()
#         sleep(3)

#         assert "Order Sucess" in driver.title

        # if addToCart:
        #     addToCart.click()
        #     sleep(3)
        #     accountBtn = driver.find_element_by_id('cartBtn')
        #     accountBtn.click()
        #     sleep(1)
        #     cartContent = driver.find_element_by_id("cartContent")
        #     contentLength = 0
        #     cartItems = cartContent.find_elements_by_tag_name('a')
        #     for div in cartItems:
        #         contentLength = contentLength+1
        #     assert contentLength > 1

    # driver.close()

# def test_payment_failure():
#     driver = webdriver.Chrome()
#     driver.get('http://localhost:3000/')
#     sleep(2)
#     username = driver.find_element_by_id('email')
#     username.send_keys('test@mail.com')
#     password = driver.find_element_by_id('password')
#     password.send_keys('Test@1234')

#     button_login = driver.find_element_by_id('loignBtn')
#     sleep(1)
#     button_login.click()
#     sleep(2)

#     content = driver.find_element_by_id('productsList')
#     products = content.find_elements_by_tag_name('a')
#     if(products[0]):
#         addToCartBtns = products[0].find_elements_by_tag_name("button")
#         addToCart = None
#         for element in addToCartBtns:
#             if element.get_attribute('innerText') == 'ADD TO CART':
#                 addToCart = element
            
#         addToCart.click()
#         driver.get('http://localhost:3000/#/app/checkout')
#         sleep(3)


#         checkoutname = driver.find_element_by_id('checkoutname')
#         checkoutname.send_keys('User Name')
#         checkoutAdress = driver.find_element_by_id('checkoutAdress')
#         checkoutAdress.send_keys('ADDRESS')
#         checkoutAdress = driver.find_element_by_id('checkoutAdress')
#         checkoutAdress.send_keys('ADDRESS')

#         userPhone = driver.find_element_by_id('userPhone')
#         userPhone.send_keys('1092332993239')

#         notes = driver.find_element_by_id('notes')
#         notes.send_keys('ADDRESS')

#         placeOrderBtn = driver.find_element_by_id('placeOrderBtn')
#         sleep(1)
#         placeOrderBtn.click()
#         sleep(3)

#         driver.implicitly_wait(10)

#         otpInput = driver.find_element_by_id('otpInput')
#         otpInput.send_keys('12345233')
#         sleep(3)

#         confirmOtp = driver.find_element_by_id('confirmOtp')
#         sleep(1)
#         confirmOtp.click()
#         sleep(3)

#         assert "Mobi Store" in driver.title