import requests
from bs4 import BeautifulSoup
import csv
import tkinter as tk
from tkinter import scrolledtext

def web_crawler(url, max_depth=3):
    visited_urls = set()
    data = []  # List to store extracted data

    def crawl(url, depth):
        if depth > max_depth or url in visited_urls:
            return

        visited_urls.add(url)
        print("Crawling:", url)

        try:
            response = requests.get(url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                process_page(soup)

        except Exception as e:
            print("Error:", e)

    def process_page(soup):
        target_elements = soup.find_all(class_="views-field views-field-display-name")

        for element in target_elements:
            link = element.find('a')
            if link:
                link_url = "https://www.naatp.org" + link.get('href')
                try:
                    response = requests.get(link_url)
                    if response.status_code == 200:
                        newsoup = BeautifulSoup(response.content, 'html.parser')
                        target_element = newsoup.find(class_="views-ajax-processed-processed member_website")
                        websiteOutput = target_element.get('href')
                        print(websiteOutput)
                        data.append({'Website': websiteOutput})  # Add data to the list

                except Exception as e:
                    print("Error:", e)

    crawl(url, depth=1)

    # Write the data to a CSV file
    csv_filename = 'website_data.csv'
    with open(csv_filename, mode='w', newline='', encoding='utf-8') as csv_file:
        fieldnames = ['Website']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

# if __name__ == "__main__":
#     starting_url = "https://www.naatp.org/resources/addiction-industry-directory?fbclid=IwAR3D_1H-mZHrmSRfMQDfuO0GG9BKkCK9xrCCHg1Fysrq-5z4ws4_RkR8GNg"
#     web_crawler(starting_url)



def on_button_click():
    web_crawler(entry.get())

# Create the main window
root = tk.Tk()
root.title("Mommy the cheater")

# Create a label
label = tk.Label(root, text="Enter your link:")
label.pack()

# Create an entry field
entry = tk.Entry(root)
entry.pack()

# Create a button
button = tk.Button(root, text="inamo g", command=on_button_click)
button.pack()


output_textbox = scrolledtext.ScrolledText(root, wrap=tk.WORD, width=40, height=10)
output_textbox.pack()

# Start the main event loop
root.mainloop()