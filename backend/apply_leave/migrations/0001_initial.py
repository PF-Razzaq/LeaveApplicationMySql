# Generated by Django 5.0.2 on 2024-02-26 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ApplyForLeave',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('leave_type', models.TextField(max_length=30)),
                ('reason', models.TextField(max_length=30)),
            ],
        ),
    ]