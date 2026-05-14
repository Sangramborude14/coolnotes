# DevNotes Architecture 📝

Below is the visualized architecture flow for the project:

```mermaid
graph TD
    A[Architecture] --> B[Create Note]
    
    A --> C[My Notes]
    C --> D[View Notes]
    D --> D1[Edit and Delete Notes]
    D --> D2[View learning level and measure time spent]
    D --> D3[Tag notes and group under Notebook]
    D --> D4[Markdown for code snippets + Shortcuts]
    D --> D5[Basic styling: Para, Title, Bullet, Bold]

    subgraph Optional
    D -.-> E1[Custom fonts, colors, and images]
    D -.-> E2[Table feature]
    D -.-> E3[Arrow-based mindmap]
    end

    A --> F[All Notes]
    F --> F1[View Notebook headings]
    F --> F2[Notebooks containing different notes]
    F --> F3[Search bar for titles]
    
    A --> G[Public Notes]
    G --> G1[Notes uploaded by other users]
    G --> G2[Search]

    A --> H[SignUp and LogIn]
    
    A --> I[Settings]
    I --> I1[Update Profile]
    I --> I2[Theme Support: Dark and Light]
```

---

### Original Flow Reference:
```text
Architecture: 
create note
my notes
my notes --> view notes --> edit and delete notes
                        --> view learning level and measures the time spent on the specific note
                        --> tag notes and group them under a notebook
                        --> markdown option for code snippet with shortcut
                        --> Basic styling like para, title, bullet and bold

                        //Optional
                        --> option to choose fonts and diffrent text colors and add images to the notes
                        --> feature to add a table
                        --> arrow based mindmap

         --> all notes  --> view heading of notebook
                        --> notebooks contain diffrent notes
                        --> searchbar for notes(title)
                        
         --> Public notes   --> notes uploaded by other users
                            --> Search 

        --> signUp and logIn

        --> setting     --> update profile
                        --> theme(dark and light)
```
