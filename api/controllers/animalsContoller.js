import { v4 } from 'uuid';
import { read_file, write_file } from '../fs/fs_api';

const list_animals = async (ctx, next) => {
    try {
        let animals = read_file("animals.json");
        ctx.body = animals;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const one_animal = async (ctx, next) => {
    try {
        let animal = read_file('animals.json').find(a => a.id == ctx.params.id);
        if (!animal) return ctx.body = "Not found!";
        ctx.body = animal;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const add_animal = async (ctx, next) => {
    try {
        let animal = ctx.request.body;
        let animals = read_file("animals.json");
        animals.push({ id: v4(), ...animal });
        write_file("animals.json", animals);
        ctx.body = animals[animals.length - 1];
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const update_animal = async (ctx, next) => {
    try {
        let { type, class_of, name } = ctx.request.body;
        let animals = read_file("animals.json");
        let found = animals.find(a => a.id == ctx.params.id)

        if (!found) return ctx.body = " Not found!";
        animals.forEach((a, idx) => {
            if (a.id == found.id) {
                a.type = type || a.type
                a.class_of = class_of || a.class_of
                a.name = name || a.name
            }
        });
        write_file("animals.json", animals)
        ctx.body = animals.find(a => a.id == ctx.params.id);
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const delete_animal = async (ctx, next) => {
    try {
        let animals = read_file("animals.json");
        let found = animals.find(a => a.id == ctx.params.id)
        if (!found) return ctx.body = "Not found!";
        animals.forEach((s, idx) => {
            if (s.id == found.id) animals.splice(idx, 1);
        })
        write_file("animals.json", animals);
        ctx.body = animals;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

export {
    list_animals, one_animal, add_animal, update_animal, delete_animal
};