import tkinter as tk
from tkinter import scrolledtext

def print_to_textbox():
    output_text = input_entry.get()
    output_textbox.insert(tk.END, output_text + '\n')
    # print(output_text)  # Display in the console as well

# Create the main application window
root = tk.Tk()
root.title("Print Function GUI")

# Create and place widgets
input_label = tk.Label(root, text="Enter text:")
input_label.pack()

input_entry = tk.Entry(root)
input_entry.pack()

print_button = tk.Button(root, text="Print", command=print_to_textbox)
print_button.pack()

output_textbox = scrolledtext.ScrolledText(root, wrap=tk.WORD, width=40, height=10)
output_textbox.pack()

root.mainloop()  # Start the GUI event loop
