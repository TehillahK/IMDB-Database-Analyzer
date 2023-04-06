# import libraries
import pyodbc
import csv

# Connect to SQL Server
myconn = pyodbc.connect("Driver={SQL Server};"
                        "Server=uranium.cs.umanitoba.ca;"
                        "Database=cs3380;"
                        "UID=alik2;"
                        "PWD=7896685;"
                        )
cursor = myconn.cursor()

#1) Create the 'people' table
try:
    cursor.execute("""
        CREATE TABLE people (
            ID VARCHAR(100) PRIMARY KEY,
            name VARCHAR(100) NULL,
            birthYear INT NULL,
            deathYear INT NULL
        )
        """)
    print("Table created successfully!")
except pyodbc.Error as error:
    print("Error occurred while creating the table:", error)

# Read the CSV file line by line and insert data into the 'people' table
data = []

with open('people.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Replace 'NULL' string with None
        row = [None if value == 'NULL' else value for value in row]
        data.append(row)

# Insert data into the 'people' table using executemany()
cursor.executemany("""
INSERT INTO people (ID, name, birthYear, deathYear)
VALUES (?, ?, ?, ?)
""", data)

# Commit the changes
myconn.commit()
#2) Create the 'title' table
cursor.execute("""
CREATE TABLE title (
    ID VARCHAR(100) PRIMARY KEY,
    name VARCHAR(300) null,
    year INT null
)
""")

# Read the CSV file line by line and insert data into the 'title' table
title_data = []

with open('Title.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Replace empty strings with None
        row = [None if value == '' else value for value in row]
        title_data.append(row)

# Insert data into the 'title' table using executemany()

cursor.executemany("""
    INSERT INTO title (ID, name, year)
    VALUES (?, ?, ?)
    """, title_data)

# Commit the changes 
myconn.commit()

# 3) Create the 'actor' table
cursor.execute("""
CREATE TABLE actor (
    ID VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NULL,
    gender VARCHAR(100) NULL,
    FOREIGN KEY (ID) REFERENCES people (ID)
)
""")

# Read the CSV file line by line and insert data into the 'actors' table
actors_data = []

with open('Actor.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Replace empty strings with None
        row = [None if value == '' else value for value in row]
        actors_data.append(row)

# Insert data into the 'actor' table using executemany()
cursor.executemany("""
INSERT INTO actor (ID, name, gender)
VALUES (?, ?, ?)
""", actors_data)

# Commit the changes
myconn.commit()
#4) Create the 'CastMember' table
cursor.execute("""
CREATE TABLE CastMember (
    titleID VARCHAR(100),
    ordering VARCHAR(100),
    actorID VARCHAR(100),
    characters VARCHAR(200),
    FOREIGN KEY (actorID) REFERENCES actor (ID),
    PRIMARY KEY (titleID, actorID,characters,ordering)
)
""")

# Read the CSV file line by line and insert data into the 'CastMember' table
cast_member_data = []

with open('CastMember.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Replace empty strings with None
        row = [None if value == '' else value for value in row]
        cast_member_data.append(row)

# Insert data into the 'CastMember' table using executemany()
cursor.executemany("""
INSERT INTO CastMember (titleID, ordering, actorID, characters)
VALUES (?, ?, ?, ?)
""", cast_member_data)

# Commit the changes
myconn.commit()
# 5) Create the 'Director' table
cursor.execute("""
CREATE TABLE Director (
    titleID VARCHAR(100),
    peopleID VARCHAR(100),
    FOREIGN KEY (titleID) REFERENCES title (ID),
    FOREIGN KEY (peopleID) REFERENCES people (ID),
    PRIMARY KEY (titleID, peopleID)
)
""")

# Read the CSV file line by line and insert data into the 'Director' table
with open('Director.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        try:
            cursor.execute("""
            INSERT INTO Director (titleID, peopleID)
            VALUES (?, ?)
            """, row)
        except pyodbc.IntegrityError:
            print("Error inserting row due to integrity error: " + str(row))


# Commit the changes
myconn.commit()
#6) Create the 'titleGenre' table
cursor.execute("""
CREATE TABLE titleGenre (
    ID int PRIMARY KEY,
    genre VARCHAR(100)
)
""")

# Read the CSV file line by line and insert data into the 'titleGenre' table
with open('titleGenre.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Insert the data into the 'titleGenre' table
        cursor.execute("""
        INSERT INTO titleGenre (ID, genre)
        VALUES (?, ?)
        """, row)
# Commit the changes
myconn.commit()

#7)Create the 'genres' table
cursor.execute("""
CREATE TABLE genres (
    ID VARCHAR(100),
    genre int,
    FOREIGN KEY (ID) REFERENCES title (ID),
    FOREIGN KEY(genre) REFERENCES titleGenre(ID),
    PRIMARY KEY (ID, genre)
)
""")

# Read the CSV file line by line and insert data into the 'genres' table
with open('Genres.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Check if the ID exists in the 'title' table
        cursor.execute("SELECT ID FROM title WHERE ID = ?", row[0])
        title_exists = cursor.fetchone()

        if title_exists:
            # Insert the data into the 'genres' table
            cursor.execute("""
            INSERT INTO genres (ID, genre)
            VALUES (?, ?)
            """, row)
        else:
            print(f"Skipping row due to missing ID in 'title' table: {row}")

# Commit the changes
myconn.commit()
#8) Create the 'languages' table
cursor.execute("""
CREATE TABLE languages (
    ID VARCHAR(100),
    language VARCHAR(100),
    FOREIGN KEY (ID) REFERENCES title (ID),
    PRIMARY KEY (ID, language)
)
""")

# Read the CSV file line by line and insert data into the 'languages' table
with open('Languages.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Check if the ID exists in the 'title' table
        cursor.execute("SELECT ID FROM title WHERE ID = ?", row[0])
        title_exists = cursor.fetchone()

        if title_exists:
            # Insert the data into the 'languages' table
            cursor.execute("""
            INSERT INTO languages (ID, language)
            VALUES (?, ?)
            """, row)
        else:
            print(f"Skipping row due to missing ID in 'title' table: {row}")

# Commit the changes
myconn.commit()

#9) Create the 'TitleType' table
cursor.execute("""
CREATE TABLE TitleType (
    ID INT PRIMARY KEY,
    type VARCHAR(100)
)
""")

# Read the CSV file line by line and insert data into the 'TitleType' table
with open('TitleType.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Insert the data into the 'TitleType' table
        cursor.execute("""
        INSERT INTO TitleType (ID, type)
        VALUES (?, ?)
        """, row)

# Commit the changes
myconn.commit()
# 10)Create the 'Ratings' table
cursor.execute("""
CREATE TABLE Ratings (
    ID VARCHAR(100) PRIMARY KEY,
    averageRating numeric,
    numVotes int
)
""")

# Read the CSV file line by line and insert data into the 'Ratings' table
with open('Ratings.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Check if the ID exists in the 'title' table
        cursor.execute("""
        SELECT COUNT(*) FROM title WHERE ID = ?
        """, row[0])
        count = cursor.fetchone()[0]

        # If the ID exists, insert the data into the 'Ratings' table
        if count > 0:
            cursor.execute("""
            INSERT INTO Ratings (ID, averageRating, numVotes)
            VALUES (?, ?, ?)
            """, row)

# Commit the changes
myconn.commit()


#11) Create the 'TvEpisode' table
cursor.execute("""
CREATE TABLE TvEpisode (
    tconst VARCHAR(100) NOT NULL,
    parentTconst VARCHAR(100) NULL,
    seasonNumber INT ,
    episodeNumber INT ,
    PRIMARY KEY (tconst),
    FOREIGN KEY (tconst) REFERENCES title (ID)
)
""")

# Read the CSV file line by line and insert data into the 'TvEpisode' table
with open('TvEpisode.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for row in reader:
        # Replace the string 'NULL' with Python's None for all columns
        row = [None if value == 'NULL' else value for value in row]

        # If the value is a digit, convert it to an int
        row[2] = int(row[2]) if row[2] and row[2].isdigit() else None
        row[3] = int(row[3]) if row[3] and row[3].isdigit() else None

        # Insert the data into the 'TvEpisode' table
        cursor.execute("""
        INSERT INTO TvEpisode (tconst, parentTconst, seasonNumber, episodeNumber)
        VALUES (?, ?, ?, ?)
        """, row)

# Commit the changes
myconn.commit()

#12) Create the 'types' table
cursor.execute("""
CREATE TABLE types (
    ID VARCHAR(100) PRIMARY KEY,
    type INT,
    FOREIGN KEY (ID) REFERENCES title (ID),
    FOREIGN KEY (type) REFERENCES TitleType (ID)
)
""")

# Read the CSV file line by line and insert data into the 'types' table
with open('types.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for index, row in enumerate(reader):
        # Check if the ID exists in the 'title' table and the type exists in the 'TitleType' table
        cursor.execute("SELECT ID FROM title WHERE ID = ?", row[0])
        title_id_exists = cursor.fetchone()

        cursor.execute("SELECT ID FROM TitleType WHERE ID = ?", row[1])
        title_type_exists = cursor.fetchone()

        # If both IDs exist, insert the row into the 'types' table
        if title_id_exists and title_type_exists:
            cursor.execute("""
            INSERT INTO types (ID, type)
            VALUES (?, ?)
            """, row)
            print(f" row  inserted {index + 1}: {row}")
            # Commit the changes
            myconn.commit()
        else:
            print(f"Skipping row {index + 1}: {row}")
#14) Create the 'writer' table
cursor.execute("""
CREATE TABLE writer (
    titleID VARCHAR(100),
    writer VARCHAR(100),
    PRIMARY KEY (titleID, writer),
    FOREIGN KEY (titleID) REFERENCES title (ID),
    FOREIGN KEY (writer) REFERENCES people (ID)
)
""")

# Read the CSV file line by line and insert data into the 'writer' table
with open('writer.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row

    for index,row in enumerate(reader):
        # Check if the titleID exists in the 'title' table and the writer exists in the 'people' table
        cursor.execute("SELECT ID FROM title WHERE ID = ?", row[0])
        title_id_exists = cursor.fetchone()

        cursor.execute("SELECT ID FROM people WHERE ID = ?", row[1])
        writer_exists = cursor.fetchone()

        # If both IDs exist, insert the row into the 'writer' table
        if title_id_exists and writer_exists:
            cursor.execute("""
            INSERT INTO writer (titleID, writer)
            VALUES (?, ?)
            """, row)
            print(f"Inserting row {index + 1}: {row}")
            #commit the transaction
            myconn.commit()
        else:
            print(f"Skipping row {index + 1}: {row}")
#close the connection
myconn.close()
