from PyPDF2 import PdfReader

reader = PdfReader(r"f:\sakshant project\AntigravityB.pdf")
print(f"Number of pages: {len(reader.pages)}")
print("=" * 60)
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    print(f"--- Page {i+1} ---")
    print(text)
    print()
