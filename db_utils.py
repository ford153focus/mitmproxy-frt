import os
import pathlib
import mysql.connector
import dotenv

class DataBase:
    def __init__(self) -> None:
        current_folder = pathlib.Path(__file__).parent.resolve()
        env_path = os.path.join(current_folder, '.env')
        env_values = dotenv.dotenv_values(dotenv_path=env_path)

        self.connection = mysql.connector.connect(
            host     = env_values['HOST'],
            user     = env_values['USER'],
            password = env_values['PASSWORD'],
            database = env_values['DATABASE'],
        )

        self.cursor = self.connection.cursor()

db = DataBase()
