# Generated by Django 5.0.7 on 2024-08-21 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0003_clientes_identificacion'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientes',
            name='estado',
            field=models.BooleanField(default=True),
        ),
    ]
