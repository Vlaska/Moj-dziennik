from pathlib import Path
import json
from random import choices, randint, choice, sample
from itertools import product


typy_ocen = ['OdpowiedŸ ustna', 'Sprawdzian', 'Kartkówka', 'Praca domowa', 'Aktywnoœæ']
klasy_polski = ['1a', '1b', '3b', '3c']
klasy_inf = [*['1' + i for i in 'abcdef'], '2a', '3a', '3c']


grades = ['1', *[i + j for i, j in product('2345', '+-=')], '6']


def typy_ocen_z_przedmiotu(klasy):
    out = {}
    for i in klasy:
        o = randint(4, 8)
        t = choices(typy_ocen, k=o)
        t.sort()
        r = {}
        for j in t:
            r[j] = t.count(j)
        out_ = []
        for k, v in r.items():
            for l in range(v):
                out_.append(f'{k} {l + 1}')
        out[i] = out_
    return out


typy_ocen_z_polskiego = typy_ocen_z_przedmiotu(klasy_polski)


typy_ocen_z_infy = typy_ocen_z_przedmiotu(klasy_inf)


typy_ocen_z_polskiego


typy_ocen_z_infy


def load_data(klasa: str):
    return json.loads(Path('.', 'src', 'klasy', str(klasa), f'{klasa}.json').read_text('utf-8'))


def save_data(klasa, nazwa, data):
    Path('.', 'src', 'klasy', str(klasa), f'{nazwa}.json').write_text(json.dumps(data, indent=4))


def gen_grades(klasa, typy_ocen):
    out = []
    num_of_students = len(klasa)
    for i in typy_ocen:
        t = {'name': i}
        num_of_grades = randint(num_of_students - randint(0, 6), num_of_students)
        students = sample(range(1, num_of_students + 1), num_of_grades)
        t['grades'] = [{'student': i, 'grade': choice(grades)} for i in students]
        students_without_grade = set(range(1, num_of_students + 1)) - set(students)
        t['grades'].extend([{'student': i, 'grade': None} for i in students_without_grade])
        t['grades'].sort(key=lambda x: x['student'])
        out.append(t)
    return out


typy_ocen_z_polskiego


def gen_all_grades(typy_ocen, nazwa):
    for klasa, typy in typy_ocen.items():
        t = gen_grades(load_data(klasa), typy)
        save_data(klasa, nazwa, t)


gen_all_grades(typy_ocen_z_polskiego, 'jpolski')


gen_all_grades(typy_ocen_z_infy, 'informatyka')



