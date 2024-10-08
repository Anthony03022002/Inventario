# Generated by Django 5.0.7 on 2024-08-11 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Clientes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cedula', models.BigIntegerField()),
                ('nombre', models.CharField(max_length=150)),
                ('apellido', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=120)),
                ('celular', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'clientes',
            },
        ),
    ]
